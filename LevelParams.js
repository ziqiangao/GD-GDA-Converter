function findDuplicatePositions(data) {
    if (!Array.isArray(data) || data.length === 0) return [];

    const positionMap = new Map();
    
    data.forEach((item, index) => {
        if (typeof item.x === 'number' && typeof item.y === 'number') {
            const key = `${item.x},${item.y}`; // Create a unique key for the position
            
            if (!positionMap.has(key)) {
                positionMap.set(key, []);
            }
            positionMap.get(key).push(index);
        }
    });

    // Filter out unique positions and return only duplicates
    return Array.from(positionMap.values()).filter(indexes => indexes.length > 1);
}

function getBestSize(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return { width: 20, height: 20 }; // Default values if no data
    }

    let maxX = 0;
    let maxY = 0;

    for (const item of data) {
        if (typeof item.x === 'number') maxX = Math.max(maxX, item.x);
        if (typeof item.y === 'number') maxY = Math.max(maxY, item.y);
    }

    return {
        width: Math.floor(maxX / 30) + 10,
        height: Math.floor(maxY / 30) + 10
    };
}