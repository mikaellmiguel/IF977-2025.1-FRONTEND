import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export function renderRedeSocial(url) {
    if (url.includes("twitter.com")) {
        return <FaTwitter color="#1DA1F2" />;
    } else if (url.includes("facebook.com")) {
        return <FaFacebook color="#1877F2" />;
    } else if (url.includes("instagram.com")) {
        return <FaInstagram color="#E1306C" />;
    } else if (url.includes("youtube.com")) {
        return <FaYoutube color="#FF0000" />;
    } else {
        return null;
    }
};
