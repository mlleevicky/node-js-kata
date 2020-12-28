# Node.js Kata - Part 1: Library

Code kata in Node.js where you have to write a library of books and magazines.

[A code kata is an exercise in programming which helps a programmer hone their skills through practice and repetition.](https://en.wikipedia.org/wiki/Kata_(programming))

* [Topic](#topic)
* [Frame conditions](#frame-conditions)
* [Tasks](#tasks)
* [Procedure](#procedure)
* [License](#license)

## Topic

You have to implement an abstracted and simple library system.

## Frame conditions

1. You have exact 2 hours of time - no minute longer.

   If you reach this time limit stop your work immediately.
   It is one part of the kata to respect this time limit.

2. There are no restrictions on how to use the provided time.
   If you want to code the entire time, take a break or a cigaret - it’s up to you.

3. This is a real world situation. You are allowed to consult the Internet, use every library you want, call a friend ...

   **BUT:** You are not allowed to do [pair programming](https://en.wikipedia.org/wiki/Pair_programming).
   **AND** If you have already done this kata before to have a look at your previous implementation.

4. Develop your code based on Node.js language level 8.

5. Keep the following priorities in mind while you implementing - in the mentioned order:
   1. Clean Code
   2. Loose coupling

6. Given resources:

   > **Hint:** There is a reason why there are so many books and authors in german with [umlauts](https://en.wikipedia.org/wiki/Germanic_umlaut).

   * [`authors.csv`](data/authors.csv): Contains authors with its `email`, `firstName` and `lastName`.
   * [`books.csv`](data/books.csv): Contains books with its `title`, `description`, one or more `authors` and an `isbn`.
   * [`magazines.csv`](data/magazines.csv): Contains magazines with its `title`, one or more `authors`, a `publishedAt` and an `isbn`.

7. Rating:
   * We'll mostly rate your code and see how you structure and think it.
   * Finishing the Kata in 2h, it's not the primary goal.

## Tasks

* [Main tasks](#main-tasks)
* [Optional tasks](#optional-tasks)

### Main tasks

> **Hint:** 

1. Your software should read all data from the given CSV files in a meaningful structure. For the given dataset is for test development/test, we'll run it with a larger dataset.

2. Create a GraphQL API that :
 * List all books
 * List all magazines
 * Find a book  by its `isbn`
 * Magazine by its `isbn`
 * List all `authors`
 * Find all book by their by their `authors`

3. Implement the API on defined on point (2)

### Optional tasks

> **Hint:** Optional means optional.

1. Use MongoDB to store and operate on data

2. Write useful Unit tests.

3. Add a route to add a book or a magazine to the data structure of your software

4. Add a route to export each resource to CSV

5. Add a docker to run your server

## Procedure

1. Get the code. (Git clone)

2. Open in your favorite IDE.

3. Start the kata.

4. Publish your code and give us the url.

## FAQ

##### How to run your application?

```bash
npm run start
```

##### How to run your tests?

```bash
npm run lint
npm run test
```

## Rating


## License

See [LICENSE](LICENSE) file.
