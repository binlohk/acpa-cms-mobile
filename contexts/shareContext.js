import React from 'react';

export const ShareContext = React.createContext(null);

export default ({ children }) => {
    const [courseList, CourseReply] = React.useState("")
    const [referreeList, ReferreeReply] = React.useState("")

    const share = {
        courseShare: [courseList, CourseReply],
        referreeShare: [referreeList, ReferreeReply]
    }

    return (
        <ShareContext.Provider value={share}>
            {children}
        </ShareContext.Provider>
    )
}