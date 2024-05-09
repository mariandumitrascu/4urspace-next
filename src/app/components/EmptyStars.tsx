import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function EmptyStars() {
    const numberOfStars = 5;
    return (
        <div>
            {Array.from({ length: numberOfStars }, (_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} color={"#e6e6e6"} className="star-0" />
            ))}
        </div>
    );
}