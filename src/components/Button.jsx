import { Link } from "react-router-dom";

const LinkButton = (props) => {
    return <Link onClick={props.onClick} className={props.className} type={props.type} to={props.to} disabled={props.disabled}>{props.children}</Link>;
}

export default LinkButton;