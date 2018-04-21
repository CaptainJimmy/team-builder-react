

var parent  = {
    id: "",
    name: ""
    login: {}
    children: [
        { 
            name:"child A ", 
            goals: [ 
                {
                    goalName: "", 
                    dueDate: "Tuesday", 
                    pointValue: 1, 
                    reoccuringDays: []
                }
            ],
            totalPoints: null,
            username: "childa",
            passwordPicture: "Fish"
        },
        { 
            name:"child B ", 
            goals: [
                {
                    goalName: "Goal A", 
                    dueDate: "Tuesday", 
                    pointValue: 1, 
                    reoccuringDays: []
                },
                {
                    goalName: "Goal B", 
                    dueDate: "Monday", 
                    pointValue: 1, 
                    reoccuringDays: ["Monday","Wednesday","Saturday"]
                }
            ],
            totalPoints: null,
            username: "childb",
            passwordPicture: "Bird"
        },
        ]
    }
