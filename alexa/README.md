## README

* Create deployment package

```
cd alexa/src
zip -9 -r ../Alexa-Dinnercaster-v0.1.zip *
```

* Upload to Lambda

* Algorithm v0

1. Find Day of Week
2. Pull that days scores from list
3. Add General Score Factor
4. Add Weather Factor
5. Add Kids Factor
6. Sort based on highest to lowest
7. Randomly pick between top 2 choices
