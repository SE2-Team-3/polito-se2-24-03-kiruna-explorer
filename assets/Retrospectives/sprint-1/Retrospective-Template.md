# TEMPLATE FOR RETROSPECTIVE (Team #3)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done: 3 / 3
- Total points committed vs. done: 7 / 7
- Nr of hours planned vs. spent (as a team): 110h 10m / 111h 15m

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  | 11      |        | 59h 10m    | 52h 5m       |
| KX1   | 9       | 3      | 15h        | 21h 5m       |
| KX2   | 9       | 2      | 18h        | 21h          |
| KX3   | 9       | 2      | 18h        | 17h 5m       |

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|       | avg EST | avg ACT | standard dev EST | stardard dev ACT |
| ----- | ------- | ------- | ---------------- | ---------------- |
| tasks | 2h 54m  | 2h 56m  | 4h 22m           | 3h 6m            |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

  $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$
  =0,009833585

- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

  $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$
  =0,01955093

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 5h
  - Total hours spent: 7h 15m
  - Nr of automated unit test cases: 24
  - Coverage (if available): statements 67.56%, branch 37.68%, functions: 63.15%, lines: 70.67%
- E2E testing:
  - Total hours estimated: 6h
  - Total hours spent: 3h 40m
- Code review
  - Total hours estimated: 9h
  - Total hours spent: 9h 5m

## ASSESSMENT

- What caused your errors in estimation (if any)?

  - Mockups could be designed in various level of complexities e.g. simple, complex to be choosen by the developer team.
  - Responsiveness in the Front End could have its own dedicated time.
  - Front End development could be have different estimations based on the user story complexity.

- What lessons did you learn (both positive and negative) in this sprint?

  - (+) If we consider much more collaborations, we can make all team members more confident about the output of the product.
  - (+) If we have a good planning, we can create a balance in task assignments between members.
  - (-) We may consider more time for the UI/UX, specially mockups to consider alternatives.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - much more realistic estimation for tasks.
  - team collaboration for tasks.

- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > Sharing ideas about the design in mockups could guide the Front End developers to work on the UI/UX in a better way.

- One thing you are proud of as a Team!!
  > Collaboration of all team members to implement all the functionalities to the final product.
