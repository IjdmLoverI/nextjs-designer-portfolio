import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const serious = async (page: import("@playwright/test").Page) => {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  return results.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
};

test("home page shows the intro and the featured case studies", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("calm products");
  await expect(page.getByTestId("project-card")).toHaveCount(2);
});

test("a case study opens from the grid on its own URL", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByTestId("project-card")).toHaveCount(3);
  await page.getByTestId("project-card").filter({ hasText: "Routeline" }).click();
  await expect(page).toHaveURL(/\/projects\/routeline-dashboard$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Routeline: a dashboard dispatchers trust");
  await expect(page.getByRole("heading", { level: 2, name: "Approach" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Next project/ })).toBeVisible();
});

test("each case study has its own Open Graph image", async ({ page, request }) => {
  await page.goto("/projects/cragly-booking");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toContain("/projects/cragly-booking/opengraph-image");
  const image = await request.get(new URL(og!).pathname);
  expect(image.headers()["content-type"]).toBe("image/png");
});

test("an unknown case study is a 404", async ({ page }) => {
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page doesn’t exist");
});

test("the contact form explains what is wrong and moves focus there", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByLabel("Name")).toBeFocused();

  await page.getByLabel("Name").fill("Ann");
  await page.getByLabel("Email").fill("ann@example.com");
  await page.getByLabel("About the project").fill("A portfolio for a product designer, five pages, launch next month.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("demo site");
});

test("sitemap lists every page and case study", async ({ request }) => {
  const body = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/projects", "/about", "/contact", "/projects/paylane-onboarding"]) {
    expect(body).toContain(path);
  }
});

for (const path of ["/", "/projects/paylane-onboarding", "/contact"]) {
  test(`no serious accessibility issues on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    expect(await serious(page)).toEqual([]);
  });
}
