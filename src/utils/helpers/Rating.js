import { GUEST_RATINGS } from "../../constants/Rating.constant";

export const pointToLabel = (point) => {
    for (const rating in GUEST_RATINGS) {
        if (GUEST_RATINGS[rating].CRITERIA <= point) {
            return GUEST_RATINGS[rating].LABEL.slice(0, -5);
        }
    }
    return "TỆ";
}