import { Container } from "./style"
export function Button({children, ...rest}) {
    return (
        <Container {...rest}>
            {children}
        </Container>
    )
}