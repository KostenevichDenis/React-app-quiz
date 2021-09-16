import classes from './AnswerItem.module.css'

const AnswerItem = props => {
    const clsses = [classes.AnswerItem]
    if (props.state) {
        clsses.push(classes[props.state])
    }

    return (
        <li
            className={clsses.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem