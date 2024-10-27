import { css, html, LitElement } from 'lit';
import '@lion/ui/define/lion-button.js';
import '@lion/ui/accordion.js';
import '@lion/ui/define/lion-icon.js';
import './popup.js';

class UserCreditDetails extends LitElement {
  static styles = css`
    :host {
      display: flex;
      font-family: Arial, sans-serif;
      height: 100vh;
      width: 100%;
      background-color: #f8f9fa;
    }
    .sidebar {
      width: 250px;
      background-color: #0056b3;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .profile-info {
      text-align: center;
      margin-top: 20px;
    }
    .profile-pic {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      margin-bottom: 10px;
    }
    .karma {
      color: #ff3d00;
      font-size: 24px;
      margin-top: 10px;
    }
    .main-content {
      display: flex;
      flex-grow: 1;
      padding: 20px;
    }
    .details-section {
      display: flex;
      width: 100%;
      gap: 20px;
    }
    .personal-info, .credit-details {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      flex: 1;
    }
    .personal-info h2,
    .credit-details h2 {
      font-size: 1.2em;
      color: #333;
    }
    .credit-amount {
      font-size: 24px;
      color: #d9534f;
    }
    lion-button {
      background: #007BFF;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 1em;
    }
    lion-button:hover {
      opacity: 0.8;
    }
    .buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .bank-account-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .about-me {
      margin-top: 20px;
    }
  `;

  render() {
    return html`
      <div class="sidebar">
        <div class="profile-info">
          <h3>Cristian Tudor Popescu</h3>
          <p>ctp55</p>
          <p>ctp_55@gmail.com</p>
        </div>
        <img src="https://i0.1616.ro/media/601/3161/38616/20732698/1/ctp.jpg" class="profile-pic" alt="Profile Picture" />
      </div>

      <div class="main-content">
        <div class="details-section">
          <div class="personal-info">
            <h2>Personal Information</h2>
            <p>Facebook: <a href="https://www.facebook.com/CTPopescu/" target="_blank">View</a></p>
            <p>Mobile phone: +40756435675</p>
            <p>Tax residence: Romania</p>
            <p>Passport: C03506973</p>

            <div class="bank-account-info">
              <span>Bank Account:</span>
              <span>ROBTLRN0430430535</span>
            </div>
            <div>
              <span>Bank:</span>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/ING_Group_N.V._Logo.svg/1280px-ING_Group_N.V._Logo.svg.png" alt="Bank Logo" style="height: 24px; margin-left: 5px;" />
            </div>

            <div class="about-me">
              <span>About Me:</span>
              <p>Lorem ipsum dolor sit amet...</p>
            </div>

            <div>
              <span>About My Company:</span>
              <p>Company details...</p>
            </div>

            <div>
              <span>Credit History:</span>
              <p>Credit history details...</p>
            </div>
          </div>

          <div class="credit-details">
            <h2>Credit Details</h2>
            <div class="credit-amount">1500 USD</div>
            <p>Term: 6 months</p>
            <p>Interest rate: 3%</p>
            <p>Collateral: Collateral-free</p>
            <p>Purpose: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

            <div class="buttons">
              <lion-button @click="${this.openCreditPopup}">Give Credit</lion-button>
              <lion-button @click="${this.openCommentPopup}">Comment</lion-button>
            </div>
          </div>
        </div>
      </div>

      <popup-dialog id="creditPopup"></popup-dialog>
      <popup-dialog id="commentPopup"></popup-dialog>
    `;
  }

  openCreditPopup() {
    const popup = this.shadowRoot.getElementById('creditPopup');
    const creditMessage = `This credit facility is designed to empower your financial flexibility. Timely repayments are crucial to maintaining your credit profile and ensuring continued access to our services. For any inquiries or assistance, please do not hesitate to reach out at ctpcredit@ing.com.
      Thank you for your trust in us.`;
    popup.open(creditMessage);
  }

  openCommentPopup() {
    const commentText = `
      We appreciate your feedback on the credit terms. 
      Please share your thoughts or inquiries regarding the $1,500 credit starting tomorrow from 10:00 AM.
    `;
    const popup = this.shadowRoot.getElementById('commentPopup');
    popup.open(commentText);
  }
}

customElements.define('user-details', UserCreditDetails);
