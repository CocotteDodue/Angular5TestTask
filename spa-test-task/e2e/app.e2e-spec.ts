import { AppPage } from "./app.po";

describe("spa-test-task App", () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it("should display welcome message", () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual("Welcome to Angular5 Test task!");
    });
});
