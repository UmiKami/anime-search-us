import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FeedbackReport.css";

const api = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer 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`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
    },
});

const FeedbackReport = ({ description, sendReport, setSendReport }) => {
    const [issueCreated, setIssueCreated] = useState(false);

    useEffect(() => {
        const createIssue = async () => {
            try {
                const response = await api.post(
                    `/repos/umikami/anime-search-react/issues`,
                    {
                        title: description.slice(0, 75) + "...",
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
        };

        if (sendReport) {
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
