import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Main from "../Main";
jest.setTimeout(10000);

describe('<Main >', () => {
    it("should render the posts and search for a post", async () => {
        render(<Main />, { wrapper: MemoryRouter });

        const loader = screen.getByText(/Loading.../i);
        expect(loader).toBeInTheDocument();

        await waitFor(() => {
            const allPosts = screen.getAllByRole("button", { name: /Show JSON/i });
            expect(allPosts).toHaveLength(20);

            const searchBox = screen.getByLabelText(/Enter title or author/i);
            expect(searchBox).toBeInTheDocument();
            fireEvent.change(searchBox, { target: { value: "a" } });
        }, { timeout: 6000 });
    })
});
