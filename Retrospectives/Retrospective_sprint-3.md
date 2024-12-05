# TEMPLATE FOR RETROSPECTIVE (Team #3)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done 6 / 6
- Total points committed vs done 29 / 29
- Nr of hours planned vs spent (as a team) 112h / 113h 50m

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 6       | -      | 23h 45m    | 24h 15m      |
| KX8   | 11      | 8      | 16h 45m    | 19h 5m       |
| KX9   | 10      | 2      | 13h 30m    | 14h          |
| KX19  | 8       | 3      | 16h        | 12h 30m      |
| KX10  | 8       | 13     | 24h        | 25h 30m      |
| KX20  | 3       | 1      | 1h 30m     | 1h 30m       |
| KX14  | 11      | 2      | 16h 30m    | 17h          |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task (average, standard deviation): avg_est = 1h 57m; avg_actual = 1h 59m; standard_dev_est = 1h 55m; standard_dev_actual = 2h 2m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent -1 = -0,016105

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 2h 30m
  - Total hours spent: 2h 30m
  - Nr of automated unit test cases: 45
  - Coverage (if available): 57.31% lines, 54.96% stmts
- Integration Testing:
  - Nr of automated integration test cases: 9
- E2E testing:
  - Total hours estimated: 7h
  - Total hours spent: 6h 15m
- Code review
  - Total hours estimated: 10h
  - Total hours spent: 9h 30m
- Technical Debt management:

  - Strategy adopted

    - Overal, after developing a feature by developer(s), we'll manage the TD both manually and automatically.
      Firstly, developer will analyze and fix the discovered issues by SonarQube e.g. maintainability, reliability, security order by severity as much as feasible.
      Secondly, another developer as code reviewer will review the code to discover code smell, bug, vulnerability or security issues. then developer will apply the fixes.
      Lastly, E2E testing engineer will try to analyze the system again and discover any possible bugs and reliability and maintainability issues and report it. Then the developer again create a pull request and apply the possible fixes.
      Then the code will be reviewed to reduce the issues as much as possible and avoid any maintainability and reliability and security issues.

  - Total hours estimated at sprint planning: 20h30m
  - Total hours spent: 22h

## ASSESSMENT

- What caused your errors in estimation (if any)?

- What lessons did you learn (both positive and negative) in this sprint?

  - (+) We are proud of our collaborative problem-solving approach. As always, whenever unexpected challenges arose, we came together as a team to tackle them effectively.
  - (+) We implemented advice from the previous sprint retrospective rather than focusing all our efforts in a single day for mockups. We split the work more evenly throughout the sprint.
  - (+) We managed to still complete the work and everything turned out great

  - (-) While we made progress, we need to focus on increasing unit test coverage further in the next sprint.
  - (-) We ran into problems with tasks in the last days as assignment and schedule wasn't on point

- Which improvement goals set in the previous retrospective were you able to achieve?

  - Have a more precise schedule for the start of the sprint.
  - Assign high-priority tasks according to the available time in the first few days to avoid wasting time.

- Which ones you were not able to achieve? Why?

  - We achieved our set goals.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - According to the result of tests, we planned to achieve a better coverage on unit tests in the next sprint.

- One thing you are proud of as a Team!!
  - We managed to still complete the work and everything turned out great
