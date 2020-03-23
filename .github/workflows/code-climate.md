# # The name of the workflow
# name: code-climate

# # What conditions trigger the workflow
# #  In this case, all pushes and pull requests
# on: [push, pull_request]

# # The jobs that will be run, usually in parallel
# jobs:
#   # A job to generate and publish code coverage
#   coverage:
#     # A more descriptive name of the job
#     name: Test and publish test coverage

#     # The OS on which the job will run
#     runs-on:
#       ubuntu-latest
#       # The steps for the job, executed in sequence
#     steps:
#       # A GitHub action for checking out the current branch
#       - uses: actions/checkout@master

#       # A GitHub action to setup Node.js
#       - uses: actions/setup-node@master
#         with:
#           node-version:
#             "12"
#             # Run the NPM install command before proceeding
#       - run: npm install
#         working-directory: ./nativeApp
#           # A GitHub action for running tests and publishing coverage
#       - name: Code Climate Test Reporter
#         uses: aktions/codeclimate-test-reporter@v1
#         with:
#           codeclimate-test-reporter-id: ${{ secrets.CODE_CLIMATE_SECRET }}
#           command: after-build