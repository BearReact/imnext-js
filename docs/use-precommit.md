# Using Pre-Commit

## setting files
- .cz-config.js
- .czrc

## package.json

```json
{
    "validate-commit-msg": "2.14.0",
    "husky": "3.1.0",
    "pre-commit": "1.2.2",
    "lint-staged": "9.5.0",
    "cz-conventional-changelog": "3.0.2",
    "cz-customizable": "6.2.0"
}
```

## package.json script

```json
{
    "scripts": {
        "cz": "git cz"
    },
    "lint-staged": {
        "*.js": [
            "yarn lint:js-fix",
            "git add --force"
        ]
    },
    "husky": {
        "hooks": {
            "commit-msg": "validate-commit-msg",
            "pre-commit": "yarn lint:staged"
        }
    }
}
```

## ISSUE

```zsh
pre-commit: 
pre-commit: We have nothing pre-commit hooks to run. Either you're missing the `scripts`
pre-commit: in your `package.json` or have configured pre-commit to run nothing.
pre-commit: Skipping the pre-commit hook.
pre-commit: 
```

run

```
# clear
$ git clean -xdf
$ rm -rf .git/hooks/*

# reinstall
$ yarn
$ cp .env.develop .env
```