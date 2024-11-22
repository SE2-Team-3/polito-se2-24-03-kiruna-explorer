# TEMPLATE FOR RETROSPECTIVE (Team #3)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done: 4 / 4
- Total points committed vs. done: 22 / 22
- Nr of hours planned vs. spent (as a team): 111h 55m / 110h 5m

**Remember** a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story | # Tasks | Points | Hours est. | Hours actual |
| ----- | ------- | ------ | ---------- | ------------ |
| _#0_  |   10    |        |   48h 30m  |    46h 5m    |
| KX4   |   12    |   13   |   18h 40m  |    20h 30m   |
| KX5   |    8    |    5   |   11h 40m  |    11h 20m   |
| KX6   |    9    |    1   |   14h 40m  |    13h 5m    |
| KX7   |   11    |    3   |   18h 25m  |    19h 5m    |

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|       | avg EST | avg ACT | standard dev EST | stardard dev ACT |
| ----- | ------- | ------- | ---------------- | ---------------- |
| tasks | 2h 14m  | 2h 12m  |     2h 32m       |    2h 9m         |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

  $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$
  = -0,0163812

- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

  $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$
  = 0.213194

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 4h
  - Total hours spent: 4h
  - Nr of automated unit test cases: 37
  - Coverage (if available): stmts 71.61%, branch 40%, funcs 72.78%, lines 75.85%
- E2E testing:
  - Total hours estimated: 4h
  - Total hours spent: 3h 30m
- Code review
  - Total hours estimated: 8h
  - Total hours spent: 8h 30m

## ASSESSMENT

- What caused your errors in estimation (if any)?
  - Underestimation of effort needed to change the Front-End after the Demo
  - Style review meetings between designer and developer included time spent for fixing which wasn't part of the original idea

- What lessons did you learn (both positive and negative) in this sprint?
  - We waste days at the start of the sprint making the second week more loaded with work
  - Spending more time on styling improves the quality of the final product

- Which improvement goals set in the previous retrospective were you able to achieve?
  - Properly shared ideas and feedback on the mockups

- Which ones you were not able to achieve? Why?
  - Only one goal was set and it was achieved

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - Have a more precise schedule for the sprint start
  - Assign high priority tasks according to available time in the first days, to avoid time waste

- One thing you are proud of as a Team!!
  - We are precise on chosing stories to cover, meaning we know how much we can done
  - We haven't ran into any conflict about important decisions, we are able to share and compromise on our different ideas