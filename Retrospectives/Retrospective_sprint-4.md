# TEMPLATE FOR RETROSPECTIVE (Team #3)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs done 7 / 7
- Total points committed vs done 30 / 30
- Nr of hours planned vs spent (as a team) 111h 45m / 114h 35m

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 17      | -      | 58h15m     | 60h          |
| kx11  | 7       | 5      | 10h        | 10h          |
| kx17  | 5       | 3      | 4h         | 6h35m        |
| kx12  | 4       | 8      | 6h         | 5h30m        |
| kx13  | 10      | 5      | 10h30m     | 10h          |
| kx15  | 6       | 3      | 7h30m      | 7h30m        |
| kx16  | 5       | 3      | 5h         | 3h50m        |
| kx18  | 9       | 3      | 10h30m     | 10h10m       |

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|            | Mean  | StDev |
| ---------- | ----- | ----- |
| Estimation | 1h45m | 2h    |
| Actual     | 1h47m | 2h6m  |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1 = 0.02535421

  $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$

- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n = 0.13113799

  $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 5h 30m
  - Total hours spent: 5h 10m
  - Nr of automated unit test cases: 128 (111 unit, 17 integration)
  - Coverage: stmt 80.85%, lines 84.17% (unit: 67.23, 68.41; integration: 68.76, 72.85)
- E2E testing:
  - Total hours estimated: 11h
  - Total hours spent: 10h 10m
  - Nr of test cases (manual)
- Code review
  - Total hours estimated: 10h 30m
  - Total hours spent: 10h
- Technical Debt management:

  - Strategy adopted

    - Overal, We defined a pipeline with multiple stages for each defined user story.
    - Technically, after developing a feature by developer(s), we'll manage the TD both manually and automatically.
      - Firstly, developer will analyze and fix the discovered issues by SonarQube e.g. maintainability, reliability, security order by severity as much as feasible.
      - Secondly, another developer as code reviewer will review the code to discover code smell, bug, vulnerability or security issues. then developer will apply the fixes.
      - Lastly, E2E testing engineer will try to analyze the system again and discover any possible bugs and reliability and maintainability issues and report it. Then the developer again create a pull request and apply the possible fixes.
      Then the code will be reviewed to reduce the issues as much as possible and avoid any maintainability and reliability and security issues.
    - In addition, we considered a dedicated general track of TD management task to analyz the whole code and report any issues to solve them.

  - Total hours estimated estimated: 24h
  - Total hours spent: 24h

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Partial understanding of a functionality of the diagram library led to underestimation of KX17,
    the extra time went on KX17 led to less time spent on KX12 as well

- What lessons did you learn (both positive and negative) in this sprint?

  - (+) We managed to complete all the defined user stories and at the same time applied some fixes to previously developed product.
  - (+) We know that by applying our strategies, now we have more precise perspective about our abilities as a team for the next sprints.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - We achieved better test coverage compared to previous sprint.

- Which ones you were not able to achieve? Why?

  - We achieved our set goals.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - None (considering this was the last sprint).

- One thing you are proud of as a Team!!
  - We did a great work, didn't have any internal fights and the end result is really good. We were able to implement ALL user stories in our application and achieved all our set goals with great communication and team spirit
