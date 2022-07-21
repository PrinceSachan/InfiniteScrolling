import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Rawjson from '../Rawjson'

test('should render the button element', () => {
    render(
        <BrowserRouter>
            <Rawjson />
        </BrowserRouter>
    );
    const btnElement = screen.getByRole('button', { name: /go back/i });
    expect(btnElement).toBeInTheDocument();
    fireEvent.click(btnElement);
})