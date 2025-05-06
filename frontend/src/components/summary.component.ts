
export class SummaryComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="summary-container">
                <h2>Summary</h2>
                <p>This is the summary section of the dashboard.</p>
                <p>Here you can find a summary of your expenses and income.</p>
                <p>More details will be added soon.</p>
            </div>`;
    }
}