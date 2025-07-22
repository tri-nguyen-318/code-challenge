# Specification for a software module

## Requirements

1. We have a website with a score board, which shows the top 10 user’s scores.
2. We want live update of the score board.
3. User can do an action (which we do not need to care what the action is), completing this action will increase the user’s score.
4. Upon completion the action will dispatch an API call to the application server to update the score.
5. We want to prevent malicious users from increasing scores without authorisation.

### API endpoints

- /api/v1/get-top-10: Get top 10 scores. (Note: Need to clarify malicious can view or not).

- /api/v1/login: User input the credentials (username,password), authen for him, then set jwt (accessToken, refreshToken) in cookies (httpOnly).

- /api/v1/increase-score:

  ### Note1: Protect this route by using jwt verify.

  After user finished action. Increase the user score. We can use Redis to cache the result from the DB. After finished this action, call socket to push event to the browsers of other users (realtime)

### Since we have login api, we might need to implement some others API related to the auth

- /api/v1/refresh: In case in accessToken is expired, use this api to generate new accessToken for the user.

- /api/v1/signup: Allow new users to sign up. (Might be we need to implement SSO (Sign in by Google) too).

- /api/v1/logout: Logout.
