import { FaSearch } from "react-icons/fa";
import { Container } from "./styles";

export function SearchBar({ ...rest}) {
  return (
    <Container>
      <FaSearch />
      <input type="text" {...rest} />
    </Container>
  )
}