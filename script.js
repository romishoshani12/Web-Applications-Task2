"use strict";

const IMAGE_PATHS = {
    toy: "assets/Toy.JPG",
    toyWithFlower: "assets/toy_with_flower.JPG",
    happy: "assets/toy_happy.JPG",
    sad: "assets/toy_sad.jpeg",
    flower: "assets/flower.jpg"
};

const DEFAULT_FLEX_VALUES = {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    alignContent: "stretch"
};

const PROPERTY_SETTINGS = {
    flexDirection: {
        cssName: "flex-direction",
        label: "כיוון הפריטים",
        options: ["row", "row-reverse", "column", "column-reverse"]
    },
    justifyContent: {
        cssName: "justify-content",
        label: "יישור בציר הראשי",
        options: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"]
    },
    alignItems: {
        cssName: "align-items",
        label: "יישור בציר המשני",
        options: ["flex-start", "center", "flex-end", "stretch"]
    },
    flexWrap: {
        cssName: "flex-wrap",
        label: "גלישת פריטים",
        options: ["nowrap", "wrap", "wrap-reverse"]
    },
    alignContent: {
        cssName: "align-content",
        label: "יישור השורות",
        options: ["stretch", "flex-start", "center", "flex-end", "space-between", "space-around"]
    }
};

const LEVELS = [
    {
        title: "אל הפרח הראשון",
        instruction: "העבירו את טוי לקצה הימני של השביל.",
        learning: "רמז: justify-content מזיז פריטים לאורך הציר הראשי.",
        itemCount: 1,
        properties: ["justifyContent"],
        solution: { justifyContent: "flex-end" }
    },
    {
        title: "הפרחים שבתחתית",
        instruction: "מרכזו שתי טוי לרוחב והצמידו אותן לתחתית.",
        learning: "שלבו יישור בציר הראשי ובציר המשני.",
        itemCount: 2,
        properties: ["justifyContent", "alignItems"],
        solution: { justifyContent: "center", alignItems: "flex-end" }
    },
    {
        title: "צועדות לאחור",
        instruction: "הפכו את כיוון השורה ופזרו שלוש טוי בין הקצוות.",
        learning: "row-reverse משנה את סדר הפריטים ואת כיוון הציר הראשי.",
        itemCount: 3,
        properties: ["flexDirection", "justifyContent"],
        solution: { flexDirection: "row-reverse", justifyContent: "space-between" }
    },
    {
        title: "מגדל הפרחים",
        instruction: "סדרו שלוש טוי בטור, פזרו אותן לגובה ומרכזו לרוחב.",
        learning: "בכיוון column הציר הראשי הופך לאנכי.",
        itemCount: 3,
        properties: ["flexDirection", "justifyContent", "alignItems"],
        solution: { flexDirection: "column", justifyContent: "space-between", alignItems: "center" }
    },
    {
        title: "הפינה המפתיעה",
        instruction: "הפכו את כיוון הטור והביאו שתי טוי לפינה הימנית העליונה.",
        learning: "column-reverse הופך את נקודת ההתחלה של הציר הראשי.",
        itemCount: 2,
        properties: ["flexDirection", "justifyContent", "alignItems"],
        solution: { flexDirection: "column-reverse", justifyContent: "flex-end", alignItems: "flex-end" }
    },
    {
        title: "שתי שורות בגינה",
        instruction: "צרו שתי שורות והרחיקו את השורות והפריטים לקצוות.",
        learning: "flex-wrap יוצר שורות; align-content מסדר את השורות.",
        itemCount: 6,
        itemWidth: 168,
        properties: ["flexWrap", "justifyContent", "alignContent"],
        solution: { flexWrap: "wrap", justifyContent: "space-between", alignContent: "space-between" }
    },
    {
        title: "זר פרחים הפוך",
        instruction: "הפכו את השורה, אפשרו גלישה, מרכזו את השורות ופזרו את הפריטים סביב.",
        learning: "ארבעה מאפיינים פועלים יחד על אותו Flex Container.",
        itemCount: 6,
        itemWidth: 168,
        properties: ["flexDirection", "flexWrap", "justifyContent", "alignContent"],
        solution: {
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center"
        }
    },
    {
        title: "שביל הפריחה",
        instruction: "צרו טורים הפוכים, פזרו את טוי לגובה והרחיקו את הטורים.",
        learning: "בשלב הזה משלבים כיוון, גלישה ויישור בשני הצירים.",
        itemCount: 5,
        itemWidth: 120,
        itemHeight: 128,
        properties: ["flexDirection", "flexWrap", "justifyContent", "alignContent"],
        solution: {
            flexDirection: "column",
            flexWrap: "wrap-reverse",
            justifyContent: "space-evenly",
            alignContent: "space-between"
        }
    },
    {
        title: "הטור הסודי",
        instruction: "בנו טור הפוך בצד השמאלי והשאירו מרווח סביב כל טוי.",
        learning: "space-around מוסיף מרווח משני הצדדים של כל פריט.",
        itemCount: 3,
        properties: ["flexDirection", "justifyContent", "alignItems"],
        solution: {
            flexDirection: "column-reverse",
            justifyContent: "space-around",
            alignItems: "flex-start"
        }
    },
    {
        title: "גן הפרחים הגדול",
        instruction: "הפכו את סדר הפריטים והשורות ופזרו אותם באופן שווה בכל הגינה.",
        learning: "בשלב האחרון משלבים כיוון הפוך, גלישה הפוכה ויישור של כמה שורות.",
        itemCount: 6,
        itemWidth: 168,
        properties: ["flexDirection", "flexWrap", "justifyContent", "alignContent"],
        solution: {
            flexDirection: "row-reverse",
            flexWrap: "wrap-reverse",
            justifyContent: "space-evenly",
            alignContent: "space-around"
        }
    }
];
