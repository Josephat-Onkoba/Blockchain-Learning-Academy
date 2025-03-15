# **EduChain Tokenized Course Platform**

## **Overview**
EduChain Tokenized Course Platform is a decentralized education marketplace where learners can access and purchase courses using a **tokenized economy** powered by **$EDU tokens**. The platform ensures that only accredited individuals and institutions can upload courses, while learners use **MyTokens** (exchangeable with $EDU) to access educational content.

## **Key Features**

### **1. Decentralized Course Marketplace**
- Accredited educators and institutions can upload courses.
- Users must be part of the **EduChain ecosystem** to participate.
- Course access is managed via smart contracts.

### **2. Tokenized Economy**
- **1 $EDU = 10,000 MyTokens**.
- MyTokens can only be bought with **$EDU tokens**.
- MyTokens are required for course access, forum participation, and engagement.

### **3. Course & Forum Access**
- Courses consist of **chapters, assignments, and discussion forums**.
- Learners spend MyTokens per **chapter read**.
- Assignments are free for those who have unlocked the chapter.
- **Two types of forums**:
  - **Course-specific forums** for discussions related to a particular course.
  - **Platform-wide forums** for general educational discussions.

### **4. Earn MyTokens via Forum Engagement**
- Posting in forums **costs a small MyToken fee**.
- Other users engaging (likes, comments, reposts) **reward the original poster** with MyTokens.
- Earned MyTokens can be used for other courses or converted back into **$EDU tokens**.

### **5. Blockchain & Smart Contract Integration**
- **Token Exchange Smart Contract**: Converts $EDU tokens into MyTokens.
- **Course Access Control Smart Contract**: Ensures only users with sufficient MyTokens can access courses.
- **Forum Engagement Smart Contract**: Automates MyToken rewards for contributions.
- **EduChain Identity Verification**: Users must authenticate via Open Campus ID.

## **Technology Stack**
- **Frontend:** Next.js, React, Tailwind CSS
- **Blockchain:** Solidity, EduChain, OpenZeppelin libraries
- **Smart Contract Integration:** ethers.js, Web3.js
- **Development Tools:** Hardhat, Remix, VS Code

## **Roadmap**

### **1. MVP Development**
- Develop smart contracts for token exchange, course access, and forum economy.
- UI integration with blockchain functions.
- Implement authentication via EduChain’s Open Campus ID.

### **2. Testing & Deployment**
- Conduct smart contract audits and deploy on testnet.
- Test blockchain interaction with the frontend.
- Onboard initial users and perform security reviews.

### **3. Launch & Growth**
- Deploy on **EduChain mainnet**.
- Partner with educational institutions.
- Introduce governance for decentralized course approvals.

## **Getting Started**
### **Prerequisites**
- Node.js & npm
- VS Code with Solidity extension
- EduChain testnet account
- Metamask (or compatible Web3 wallet)

### **Installation & Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/educhain-course-platform.git
   cd educhain-course-platform
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Deploy smart contracts (using Hardhat):
   ```bash
   npx hardhat run scripts/deploy.js --network testnet
   ```

## **Contributing**
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Contact**
For any inquiries or collaborations, reach out via **JosephatOnkoba_**.
