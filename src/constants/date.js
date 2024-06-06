exports.getDaysSinceToday = (dateString) => {
    // Convert the dateString to a Date object
    const date = new Date(dateString);

    // Get today's date
    const today = new Date();

    // Calculate the difference in milliseconds between the two dates
    const differenceInMilliseconds = today - date;

    // Convert milliseconds to days
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const daysSinceToday = Math.floor(
      differenceInMilliseconds / millisecondsInADay
    );

    return daysSinceToday;
  }