
export class SummaryComponent extends HTMLElement {
    private containerId: string;

    constructor() {
        super();
        this.containerId = `${this.getAttribute("id") ?? "summary"}-container`;

        this.innerHTML = `
            <div id="${this.containerId}" class="summary-container">
                <p>Loading summary...</p>
            </div>`;
    }

    connectedCallback() {
        this.fetchSummary();
    }

    renderSummary(data: SummaryResponse) {
        const container = this.querySelector(`#${this.containerId}`);
        if (container) {
            container.innerHTML = `
                <h2>Summary</h2>
                <p>Spent Amount: ${data.spentAmount} ${data.currency}</p>
                <p>Total Left Amount: ${data.totalLeftAmount} ${data.currency}</p>
                <button id="refresh-button">Refresh</button>
            `;
        }

    }

    async fetchSummary() {
        // mock API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    spentAmount: 100,
                    totalLeftAmount: 900,
                    currency: 'USD',
                });
            }, 1000);
        });
        this.renderSummary(response as SummaryResponse);
    }
}

type SummaryResponse = {
    spentAmount: number;
    totalLeftAmount: number;
    currency: string;
}