import style from "./index.module.scss";

export const Loading = () => (
    <div className={style.loading}>
        <div className={style.loadingPoint}></div>
        <div className={style.loadingPoint}></div>
        <div className={style.loadingPoint}></div>
    </div>
)