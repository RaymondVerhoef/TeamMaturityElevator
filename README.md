# Team Maturity Elevator

An interactive web-based team maturity assessment tool based on the Haags Werken Elevator framework. This application helps team coaches conduct structured conversations with IT teams to evaluate team capabilities across four perspectives and three maturity plateaus.

## Features

- **Structured Assessment:** Evaluate team capabilities against the "Haags Werken Elevator" framework's four perspectives:
  - Organization & Management
  - Systems & Facilities
  - People & Culture
  - Processes & Information
  
- **Maturity Plateaus:** Assess teams across three plateaus:
  - Reactive
  - Proactive
  - Innovative

- **Interactive Interface:** Designed for guiding two-hour assessment sessions with natural conversation flow

- **Dynamic Questions:** Adaptive question sequencing based on previous answers

- **Comprehensive Reporting:** 
  - Spider graph visualization of perspective scores
  - Automated maturity evaluation
  - Customized action plans with prioritized recommendations

## Technology Stack

- **Frontend:** React, TypeScript, TailwindCSS, Shadcn UI components
- **Backend:** Node.js, Express
- **Database:** PostgreSQL with Drizzle ORM
- **Visualization:** Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/RaymondVerhoef/TeamMaturityElevator.git
   cd TeamMaturityElevator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

1. Create a new team or select an existing team
2. Start a new assessment or continue an in-progress assessment
3. Answer the questions for each perspective
4. View results and generated action plan
5. Export results as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the Haags Werken Elevator framework for team maturity assessment