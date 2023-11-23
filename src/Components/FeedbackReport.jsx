import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FeedbackReport.css";

const api = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
    },
});

const FeedbackReport = ({ description, sendReport, setSendReport }) => {
    const [issueCreated, setIssueCreated] = useState(false);
    const [ip, setIp] = useState("");

    const isLessThanXMinutes = (minutes, timeToBeChecked) => {
        // Parse the given datetime string
        const givenDatetime = new Date(timeToBeChecked);

        // Get the current datetime
        const currentDatetime = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDatetime - givenDatetime;

        // Check if the time difference is less than X minutes (X * 60 * 1000 milliseconds)
        if (timeDifference < minutes * 60 * 1000) {
            console.log(`The datetime is less than ${minutes} minutes ago.`);
            return true
        } else {
            console.log(
                `The datetime is not less than ${minutes} minutes ago.`
            );
            return false
        }
    }

    const isOverReportLimit = async(ip) => {
                        try {
                            const response = await api.get(
                                `/repos/umikami/anime-search-react/issues`
                            );

                            // console.log(response.data);

                            if (response.status === 200) {
                                let issues = response.data
                                console.log(issues);
                                let foundIssues = issues.filter(issue => issue.title.includes(ip))

                                console.log("Issues found: ",foundIssues);

                                const RATE_LIMIT = 6;
                                let currentRate = 0;

                                let blockRequest = foundIssues.map((issue, idx) => {
                                    if (isLessThanXMinutes(20, issue.created_at)){
                                        currentRate += 1
                                    }

                                    if (currentRate > RATE_LIMIT){
                                        return true
                                    }else if (currentRate < RATE_LIMIT && idx == foundIssues.length - 1){
                                        return false
                                    }
                                })

                                console.log("Blockrequest", blockRequest, currentRate);

                                return blockRequest
                            }
                        } catch (error) {
                            console.error("Error finding issues:", error);
                        }
    }

    useEffect(() => {
        console.log(description, ip);
        const createIssue = async () => {
            let resIP = await axios.get("https://api.ipify.org/?format=json");
            
            if (resIP.status === 200) {
                console.log(resIP.data, resIP.data.ip);
                setIp(resIP.data.ip);

                let block = await isOverReportLimit(resIP.data.ip)

                

                console.log("Do we block the request? ", block);
                try {
                    const response = await api.post(
                        `/repos/umikami/anime-search-react/issues`,
                        {
                            title: ip + ": " + description.slice(0, 75) + "...",
                            body: description,
                            assignees: ["UmiKami"],
                            labels: ["bug"],
                        }
                    );

                    console.log(response.data);

                    if (response.status === 201) {
                        setIssueCreated(true);
                    }
                } catch (error) {
                    console.error("Error creating issue:", error);
                }
            }
        };

        if (sendReport) {
            console.log("Creating issue...");
            createIssue();
        }
    }, [sendReport]);

    useEffect(() => {
        if (issueCreated) {
            setTimeout(() => {
                setSendReport(false);
                setIssueCreated(false);
            }, 3000);
        }
    }, [issueCreated]);

    return (
        <main
            className="feedback-report_action"
            style={{
                position: "fixed",
                zIndex: 100,
                right: 0,
                top: `calc(50% - 25px)`,
                transformOrigin: "bottom right",
                transform: "rotate(-90deg)",
            }}
        >
            <button
                className="btn btn-warning report-btn text-dark fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#reportForm"
            >
                Report Bug
            </button>
        </main>
    );
};

export default FeedbackReport;
