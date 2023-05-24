import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from "eventsource-parser"

if (!process.env.REACT_APP_OPENAI_API_KEY) throw new Error('missing process.env.REACT_APP_OPENAI_API_KEY')

export async function OpenAIChatStream(payload: OpenAIStreamPayload) {
    const decoder = new TextDecoder()

    let counter = 0

    const res: any = await fetch("/chat", {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    })

    if (!res.ok) throw new Error(res.statusText)
    console.log('fecth chatgpt', res)

    return new ReadableStream({
        async start(controller) {
            // callback
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === "event") {
                    const data = event.data
                    // https://platform.openai.com/docs/api-reference/chat/create
                    if (data === "[DONE]") {
                        controller.close()
                        return
                    }
                    try {
                        const json = JSON.parse(data)
                        const responseData = json as ChatResponseData
                        const text = responseData.choices[0].delta.content
                        if (!text || (counter < 2 && (text.match(/\n/) || []).length)) {
                            // this is a prefix character (i.e., "\n\n"), do nothing
                            return
                        }

                        // console.log('text after parser', text)
                        controller.enqueue(text)
                        counter++
                    } catch (e: any) {
                        // maybe parse error
                        controller.error(e)
                    }
                }
            }

            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks and invoke an event for each SSE event stream
            try {
                const parser = createParser(onParse)
                // https://web.dev/streams/#asynchronous-iteration
                const reader = res.body.getReader()

                let done, value
                while (!done) {
                    ({ value, done } = await reader.read())
                    if (done) break

                    console.log('stream data before decode', value)
                    console.log('stream data after decode', decoder.decode(value))
                    parser.feed(decoder.decode(value))
                }
            } catch (e) {
                // maybe parse error
                console.log(e)
            }
        },
    })
}
