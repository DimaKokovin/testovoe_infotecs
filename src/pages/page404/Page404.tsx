
import { Button, Result } from 'antd';
import {useNavigate} from "react-router-dom";
import s from './Page404.module.css'

export  const Page404 = () => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/users");
    }

    return (
        <div className={s.container}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={onClickHandler}>Back Home</Button>}
            />
        </div>
    )
}





