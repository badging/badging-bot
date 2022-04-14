# Badging-bot

The `@badging-bot,` is a GitHub App that helps to coordinate the workflow of the [D&I Badging](https://handbook.chaoss.community/community-handbook/badging/overview), a peer-review program that is managed by the [CHAOSS Community](https://handbook.chaoss.community/community-handbook/). The main function of the badging-bot is to improve the efficiency of the review process of badging applications with some automated integration.

The badging-bot is built around the Journal of Open Source Software [peer review system](https://joss.readthedocs.io/en/latest/) and is used to facilitate the application process for earning DEI event badges.

### Functions

The badging-bot is specifically intended to:

- Guide applicants/reviewers
- Assign reviewers for a submission
- Open checklists for reviewers according to the type of event
- Check current badge status
- Generate the final badge link
- Close an application issue when an application is finalized

## Tasks

The badging bot can be used for a specific set of tasks:

- When a new submission is created. Once the issue of a new submission is successfully initiated, `@badging-bot` will do three things:
  - greet the applicant and provide guiding information \([see example](https://github.com/badging/event-diversity-and-inclusion/issues/46#issuecomment-674938374)\)
  - assign reviewers (In progress!)
  - open a checklist for each assigned reviewer \([see example](https://github.com/badging/event-diversity-and-inclusion/issues/46#issuecomment-674938396)\)
- When a command is typed in a review issue comment.
  When someone creates an issue comment with a command, the bot will be triggered and respond in a new comment. This is generally used for generating badges
- When the state of the review changes
  The bot responds to state changes by managing labels and by opening or closing the issue.

## Reporting Bugs and Issues

In case of any bugs, issues and glitches, feel free to open up a GitHub Issue or talk to the community on one of our [communication channels](https://chaoss.community/participate/).

## How to contribute

The badging bot is a result of open source contributions. We don’t take any contribution for granted. We appreciate contributions to documentation, codebase and reviews.
Our documentation is a section of the CHAOSS community handbook found [here](https://handbook.chaoss.community/community-handbook/badging/overview). For contributions to documentation, please submit a pull request to the [community handbook repository](https://www.google.com/url?sa=t&source=web&rct=j&url=https://github.com/chaoss/community-handbook&ved=2ahUKEwiBxqfM4rj2AhUDNn0KHUxMAdoQFnoECAMQAQ&usg=AOvVaw3VD3BYnkDUeeDtkYI0F4gD).
To contribute code to the badging-bot codebase, please read our [contribution guidelines](https://handbook.chaoss.community/community-handbook/contributing/design) and submit a pull request to this repository.

## Credits

- [Aastha Bist](https://github.com/bistaastha) - Original Developer of the Badging Bot
- [Ore-Aruwaji Oloruntola](https://github.com/thecraftman) - Developed Badging and CHAOSS translation tooling
- [Xiaoya Xia Esther](https://github.com/xiaoya-Esther) - Created the initial badging documentation
- [Enoch Kaxada](https://github.com/kaxada) - Developing updates and fixes for the badging-bot
- [Matt Cantu Snell](https://github.com/Nebrethar) - Founder of the DEI Badging initiative

## License

[ISC License](https://github.com/badging/badging-bot/blob/glitch/LICENSE)
