# Using Pre-Commit

## setting files
- .cz-config.js
- .czrc

## package.json

```json
{
    "validate-commit-msg": "2.14.0",
    "husky": "1.3.1",
    "pre-commit": "1.2.2",
    "lint-staged": "7.3.0",
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
