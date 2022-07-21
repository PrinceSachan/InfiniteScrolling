import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Posts from "../Posts";

const MockData = {
    title: "New task ongoing",
    author: "Prince",
    url: "https://github.com/PrinceSachan/InfiniteScrolling/blob/master/src/components/Main.tsx",
    created_at: "2022-07-21T11:30:12.000Z",
    _tags: ["React", "TypeScript", "Testing"]
}

describe('should render the posts component', () => {

    test('should render the show json button', () => {
        render(
            <BrowserRouter>
                <Posts item={MockData} />
            </BrowserRouter>
        );
        const btnElement = screen.getByRole('button', { name: /show json/i });
        expect(btnElement).toBeInTheDocument();
        fireEvent.click(btnElement);
    })

    test('should render the linnk role element', () => {
        render(
            <BrowserRouter>
                <Posts item={MockData} />
            </BrowserRouter>
        );
        const linkElement = screen.getByRole('link', { name: /full artical/i });
        expect(linkElement).toBeInTheDocument();
    })
})