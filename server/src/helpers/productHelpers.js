/**
 * A function that takes a game object from the database and formats it into information and an average rating
 * @param {object} game A game object that contain information and includes an average of all user ratings for that game
 */
function createGameObjectWithAverageRating(game) {
    let totalRating = 0;

    //calculate total rating for a game
    for (let i = 0; i < game.userGameRatings.length; i++) {
        totalRating += game.userGameRatings[i].rating;
    }
    //calculate average Rating for a game
    const averageRating = totalRating / game.userGameRatings.length;

    //check to see if a number, if so add average rating onto the game object
    if (isNaN(averageRating)) {
        game.dataValues.averageRating = 0;
    } else {
        game.dataValues.averageRating = averageRating;
    }

    delete game.dataValues.userGameRatings;
    return game;
}

/**
 * A function that takes a console object from the database and formats it into information and an average rating
 * @param {object} console A console object that contain information and includes an average of all user ratings for that console
 */
function createConsoleObjectWithAverageRating(c) {
    let totalRating = 0;

    //calculate total rating for a console
    for (let i = 0; i < c.userConsoleRatings.length; i++) {
        totalRating += c.userConsoleRatings[i].rating;
    }
    //calculate average Rating for a console
    const averageRating = totalRating / c.userConsoleRatings.length;

    //check to see if a number, if not add average rating onto the console object
    if (isNaN(averageRating)) {
        c.dataValues.averageRating = 0;
    } else {
        c.dataValues.averageRating = averageRating;
    }

    delete c.dataValues.userConsoleRatings;
    return c;
}

module.exports = {
    createConsoleObjectWithAverageRating,
    createGameObjectWithAverageRating,
};
