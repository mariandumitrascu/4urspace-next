export default function Ratings({ rating }: { rating: number }) {
    const numberOfStars = Math.round(rating);
    if (rating === 0)
        return null;

    return (
        <ul className="erate-star">
            {Array.from({ length: numberOfStars }, (_, index) => (
                <li className="active" key={`rating-${index}`}></li>
            ))}
        </ul>
    );
}