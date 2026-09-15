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

const STORAGE_KEY = "toy-and-flower-progress-v1";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const elements = {
    levelButtons: document.querySelector("#level-buttons"),
    currentLevelNumber: document.querySelector("#current-level-number"),
    totalLevels: document.querySelector("#total-levels"),
    levelBadge: document.querySelector("#level-badge"),
    levelTitle: document.querySelector("#level-title"),
    levelInstruction: document.querySelector("#level-instruction"),
    levelLearning: document.querySelector("#level-learning"),
    propertyControls: document.querySelector("#property-controls"),
    flexForm: document.querySelector("#flex-form"),
    checkButton: document.querySelector("#check-button"),
    resetButton: document.querySelector("#reset-button"),
    nextButton: document.querySelector("#next-button"),
    feedback: document.querySelector("#feedback"),
    feedbackText: document.querySelector("#feedback-text"),
    attemptCount: document.querySelector("#attempt-count"),
    scoreCount: document.querySelector("#score-count"),
    headerProgressText: document.querySelector("#header-progress-text"),
    headerProgressFill: document.querySelector("#header-progress-fill"),
    gameBoard: document.querySelector("#game-board"),
    targetLayer: document.querySelector("#target-layer"),
    playerLayer: document.querySelector("#player-layer"),
    reactionCard: document.querySelector("#reaction-card"),
    reactionImage: document.querySelector("#reaction-image"),
    reactionText: document.querySelector("#reaction-text"),
    completionDialog: document.querySelector("#completion-dialog"),
    finalScore: document.querySelector("#final-score"),
    replayButton: document.querySelector("#replay-button"),
    closeDialogButton: document.querySelector("#close-dialog-button")
};

let state = loadProgress();
let currentSelections = { ...DEFAULT_FLEX_VALUES };
let currentAttempts = 0;
let levelSolved = false;
let feedbackTimer;

function emptyProgress() {
    return {
        currentLevel: 0,
        highestUnlocked: 0,
        completedLevels: [],
        scores: {}
    };
}

function loadProgress() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!saved || typeof saved !== "object") {
            return emptyProgress();
        }

        const completedLevels = Array.isArray(saved.completedLevels)
            ? [...new Set(saved.completedLevels)].filter(
                (level) => Number.isInteger(level) && level >= 0 && level < LEVELS.length
            )
            : [];

        return {
            currentLevel: Math.min(Math.max(Number(saved.currentLevel) || 0, 0), LEVELS.length - 1),
            highestUnlocked: Math.min(Math.max(Number(saved.highestUnlocked) || 0, 0), LEVELS.length - 1),
            completedLevels,
            scores: saved.scores && typeof saved.scores === "object" ? saved.scores : {}
        };
    } catch (error) {
        return emptyProgress();
    }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        // המשחק נשאר פעיל גם כאשר הדפדפן חוסם אחסון מקומי.
    }
}

function createLevelNavigation() {
    elements.levelButtons.replaceChildren();

    LEVELS.forEach((level, index) => {
        const button = document.createElement("button");
        const completed = state.completedLevels.includes(index);

        button.type = "button";
        button.className = "level-button";
        button.textContent = completed ? "✓" : String(index + 1);
        button.title = completed ? `שלב ${index + 1} הושלם — אפשר לשחק שוב` : `מעבר לשלב ${index + 1}`;
        button.setAttribute("aria-label", completed ? `שלב ${index + 1}, הושלם` : `שלב ${index + 1}`);
        button.disabled = index > state.highestUnlocked;
        button.classList.toggle("completed", completed);
        button.classList.toggle("current", index === state.currentLevel);
        button.addEventListener("click", () => renderLevel(index));

        elements.levelButtons.append(button);
    });
}

function renderLevel(levelIndex) {
    if (levelIndex > state.highestUnlocked) {
        return;
    }

    window.clearTimeout(feedbackTimer);
    hideReaction();
    state.currentLevel = levelIndex;
    saveProgress();

    const level = LEVELS[levelIndex];
    currentSelections = getLevelStartValues(level);
    currentAttempts = 0;
    levelSolved = false;

    elements.currentLevelNumber.textContent = String(levelIndex + 1);
    elements.totalLevels.textContent = String(LEVELS.length);
    elements.levelBadge.textContent = `שלב ${levelIndex + 1}`;
    elements.levelTitle.textContent = level.title;
    elements.levelInstruction.textContent = level.instruction;
    elements.levelLearning.textContent = level.learning;
    elements.attemptCount.textContent = "0";
    elements.checkButton.disabled = false;
    elements.nextButton.disabled = true;
    setNextButtonLabel(levelIndex === LEVELS.length - 1 ? "לסיכום המשחק" : "לשלב הבא");

    clearFeedback();
    renderPropertyControls(level);
    renderPieces(level);
    applyFlexValues(elements.playerLayer, currentSelections);
    applyFlexValues(elements.targetLayer, { ...DEFAULT_FLEX_VALUES, ...level.solution });
    updateProgressDisplay();
    createLevelNavigation();
}

function getLevelStartValues(level) {
    return {
        ...DEFAULT_FLEX_VALUES,
        flexWrap: level.itemCount >= 5 ? "wrap" : DEFAULT_FLEX_VALUES.flexWrap
    };
}

function setNextButtonLabel(label) {
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "←";
    elements.nextButton.replaceChildren(document.createTextNode(label + " "), arrow);
}

function renderPropertyControls(level) {
    elements.propertyControls.replaceChildren();

    level.properties.forEach((propertyKey) => {
        const setting = PROPERTY_SETTINGS[propertyKey];
        const row = document.createElement("label");
        const codeName = document.createElement("code");
        const select = document.createElement("select");

        row.className = "code-line";
        row.title = setting.label;
        codeName.textContent = `${setting.cssName}:`;
        select.name = propertyKey;
        select.setAttribute("aria-label", `${setting.label} — ${setting.cssName}`);

        setting.options.forEach((optionValue) => {
            const option = document.createElement("option");
            option.value = optionValue;
            option.textContent = optionValue;
            option.selected = optionValue === currentSelections[propertyKey];
            select.append(option);
        });

        select.addEventListener("change", (event) => {
            currentSelections[propertyKey] = event.target.value;
            clearFeedback("הבחירה מוכנה. לחצו על הכפתור בדיקת פתרון כדי להזיז את טוי.");
            hideReaction();
        });

        row.append(codeName, select);
        elements.propertyControls.append(row);
    });
}

function renderPieces(level) {
    elements.targetLayer.replaceChildren();
    elements.playerLayer.replaceChildren();
    elements.gameBoard.classList.remove("success", "error");

    for (let index = 0; index < level.itemCount; index += 1) {
        const targetSlot = createPieceSlot(level);
        const flower = document.createElement("img");
        const playerSlot = createPieceSlot(level);
        const toy = document.createElement("img");
        const targetNumber = document.createElement("span");
        const playerNumber = document.createElement("span");

        flower.className = "flower-piece";
        flower.src = IMAGE_PATHS.flower;
        flower.alt = "";

        targetNumber.className = "piece-number target-number";
        targetNumber.textContent = String(index + 1);

        toy.className = "toy-piece";
        toy.src = IMAGE_PATHS.toy;
        toy.alt = `טוי מספר ${index + 1}`;

        playerNumber.className = "piece-number player-number";
        playerNumber.textContent = String(index + 1);

        targetSlot.append(flower, targetNumber);
        playerSlot.append(toy, playerNumber);
        elements.targetLayer.append(targetSlot);
        elements.playerLayer.append(playerSlot);
    }
}

function createPieceSlot(level) {
    const slot = document.createElement("div");
    slot.className = "piece-slot";
    slot.style.width = `${level.itemWidth || 96}px`;
    slot.style.height = `${level.itemHeight || 96}px`;
    return slot;
}

function applyFlexValues(layer, values) {
    Object.entries(DEFAULT_FLEX_VALUES).forEach(([propertyKey, defaultValue]) => {
        layer.style[propertyKey] = values[propertyKey] || defaultValue;
    });
}

function showWrongAnswer(wrongProperties) {
    elements.feedback.className = "feedback error";
    elements.feedbackText.textContent = createErrorMessage(wrongProperties);
    elements.gameBoard.classList.remove("error");
    void elements.gameBoard.offsetWidth;
    elements.gameBoard.classList.add("error");
    showReaction("error", IMAGE_PATHS.sad, "עוד ניסיון קטן");
    window.setTimeout(() => elements.gameBoard.classList.remove("error"), 500);
}

async function animateToyToSelection() {
    const slots = [...elements.playerLayer.children];

    if (reducedMotion.matches || typeof slots[0]?.animate !== "function") {
        applyFlexValues(elements.playerLayer, currentSelections);
        await new Promise((resolve) => window.setTimeout(resolve, 300));
        return;
    }

    const startRects = slots.map((slot) => slot.getBoundingClientRect());
    applyFlexValues(elements.playerLayer, currentSelections);
    const endRects = slots.map((slot) => slot.getBoundingClientRect());

    const animations = slots.map((slot, index) => {
        const deltaX = startRects[index].left - endRects[index].left;
        const deltaY = startRects[index].top - endRects[index].top;

        return slot.animate(
            [
                { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.96)` },
                { transform: "translate(0, -4px) scale(1.04)", offset: 0.86 },
                { transform: "translate(0, 0) scale(1)" }
            ],
            {
                duration: 900,
                delay: index * 70,
                easing: "cubic-bezier(0.2, 0.72, 0.2, 1)",
                fill: "both"
            }
        ).finished;
    });

    await Promise.allSettled(animations);
}

function showReaction(type, imagePath, text) {
    window.clearTimeout(feedbackTimer);
    elements.reactionCard.className = `reaction-card visible ${type}`;
    elements.reactionCard.setAttribute("aria-hidden", "false");
    elements.reactionImage.src = imagePath;
    elements.reactionImage.alt = type === "success" ? "טוי שמחה" : "טוי עצובה";
    elements.reactionText.textContent = text;

    feedbackTimer = window.setTimeout(hideReaction, type === "success" ? 3200 : 2800);
}

function hideReaction() {
    elements.reactionCard.className = "reaction-card";
    elements.reactionCard.setAttribute("aria-hidden", "true");
}

function updateProgressDisplay() {
    const completedCount = state.completedLevels.length;
    const progressPercent = (completedCount / LEVELS.length) * 100;
    const totalScore = Object.values(state.scores).reduce((sum, score) => sum + Number(score || 0), 0);

    elements.headerProgressText.textContent = `${completedCount} מתוך ${LEVELS.length} שלבים הושלמו`;
    elements.headerProgressFill.style.width = `${progressPercent}%`;
    elements.scoreCount.textContent = String(totalScore);
}

function clearFeedback(message = "בחרו ערכים ובדקו את הפתרון.") {
    elements.feedback.className = "feedback";
    elements.feedbackText.textContent = message;
}
