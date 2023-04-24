import './style.css';

const TitleHeader = (props) => {
    return (
        <div className='TitleHeader-main'>
            <div className='TitleHeader-body'>{props.name}</div>
        </div>
    );
};

TitleHeader.defaultProps = {
    name: 'Renting Buddy',
};

export default TitleHeader;