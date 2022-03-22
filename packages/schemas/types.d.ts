type BigMessageProps = {
    message: {
        variant: "big";
        media: ({
            label: string;
            illustration: "default" | "empty" | "error" | "hello" | "thanks";
        } | {
            label: string;
            chart: {
                type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                data: {
                    labels: string[];
                    datasets: {
                        label: string;
                        data: number[] | {
                            x: number;
                            y: number;
                            z: number;
                        }[];
                        hidden: boolean | undefined;
                    }[];
                };
            };
        } | {
            code: string;
        } | {
            label: string;
            light: string;
            dark: string;
            highContrast: string;
        }) | undefined;
        title: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        abstract: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        actions: {
            primary: {
                label: string;
                actionId: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            } | undefined;
            secondary: {
                label: string;
                actionId: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            } | undefined;
            tertiary: {
                label: string;
                actionId: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            } | undefined;
        } | undefined;
        viewportHeight: boolean | undefined;
    };
    level: number | undefined;
};

type BlockEntity = {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
} | {
    layout: {
        variant: "grid" | "flex";
        items: {
            item: {
                card: ({
                    paragraph: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    level: number | undefined;
                } | {
                    paragraph: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                } | {
                    media: {
                        label: string;
                        illustration: "default" | "empty" | "error" | "hello" | "thanks";
                    } | {
                        label: string;
                        chart: {
                            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                            data: {
                                labels: string[];
                                datasets: {
                                    label: string;
                                    data: number[] | {
                                        x: number;
                                        y: number;
                                        z: number;
                                    }[];
                                    hidden: boolean | undefined;
                                }[];
                            };
                        };
                    } | {
                        code: string;
                    } | {
                        label: string;
                        light: string;
                        dark: string;
                        highContrast: string;
                    };
                    caption: (string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[]) | undefined;
                    captionHidden: boolean | undefined;
                    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
                } | {
                    label: string;
                    tabs: {
                        tab: {
                            label: string;
                            size: ("small" | "medium" | "large") | undefined;
                            iconOnly: boolean | undefined;
                            icon: string | undefined;
                            iconPosition: ("before" | "after") | undefined;
                            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        };
                        panel: ({
                            paragraph: string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[];
                            level: number | undefined;
                        } | {
                            paragraph: string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[];
                        } | {
                            media: {
                                label: string;
                                illustration: "default" | "empty" | "error" | "hello" | "thanks";
                            } | {
                                label: string;
                                chart: {
                                    type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                                    data: {
                                        labels: string[];
                                        datasets: {
                                            label: string;
                                            data: number[] | {
                                                x: number;
                                                y: number;
                                                z: number;
                                            }[];
                                            hidden: boolean | undefined;
                                        }[];
                                    };
                                };
                            } | {
                                code: string;
                            } | {
                                label: string;
                                light: string;
                                dark: string;
                                highContrast: string;
                            };
                            caption: (string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[]) | undefined;
                            captionHidden: boolean | undefined;
                            variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
                        } | {
                            inputs: ({
                                label: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                                actionId: string;
                                required: boolean | undefined;
                                initialValue: string | undefined;
                                type: "text";
                                placeholder: string | undefined;
                                inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                                before: (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                }) | undefined;
                                after: (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                }) | undefined;
                                multiline: false | undefined;
                            } | {
                                type: "button";
                                label: string;
                                actionId: string;
                                variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                                size: ("small" | "medium" | "large") | undefined;
                                iconOnly: boolean | undefined;
                                icon: string | undefined;
                                iconPosition: ("before" | "after") | undefined;
                                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                iconVariant: ("filled" | "outline") | undefined;
                            })[];
                            variant: ("flex" | "narrow-block") | undefined;
                        } | {
                            descriptionList: {
                                title: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                                description: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                            }[];
                        })[];
                    }[];
                    tabVariant: ("subtle" | "transparent") | undefined;
                    tabListVariant: ("start" | "center") | undefined;
                } | {
                    inputs: ({
                        label: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                        actionId: string;
                        required: boolean | undefined;
                        initialValue: string | undefined;
                        type: "text";
                        placeholder: string | undefined;
                        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                        before: (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        }) | undefined;
                        after: (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        }) | undefined;
                        multiline: false | undefined;
                    } | {
                        type: "button";
                        label: string;
                        actionId: string;
                        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                        size: ("small" | "medium" | "large") | undefined;
                        iconOnly: boolean | undefined;
                        icon: string | undefined;
                        iconPosition: ("before" | "after") | undefined;
                        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        iconVariant: ("filled" | "outline") | undefined;
                    })[];
                    variant: ("flex" | "narrow-block") | undefined;
                } | {
                    descriptionList: {
                        title: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                        description: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                    }[];
                })[];
            };
            inlineSizeFactor: (1 | 2) | undefined;
            blockSizeFactor: (1 | 2) | undefined;
        }[];
    };
} | {
    media: {
        label: string;
        illustration: "default" | "empty" | "error" | "hello" | "thanks";
    } | {
        label: string;
        chart: {
            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
            data: {
                labels: string[];
                datasets: {
                    label: string;
                    data: number[] | {
                        x: number;
                        y: number;
                        z: number;
                    }[];
                    hidden: boolean | undefined;
                }[];
            };
        };
    } | {
        code: string;
    } | {
        label: string;
        light: string;
        dark: string;
        highContrast: string;
    };
    caption: (string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[]) | undefined;
    captionHidden: boolean | undefined;
    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
} | {
    card: ({
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        level: number | undefined;
    } | {
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    } | {
        media: {
            label: string;
            illustration: "default" | "empty" | "error" | "hello" | "thanks";
        } | {
            label: string;
            chart: {
                type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                data: {
                    labels: string[];
                    datasets: {
                        label: string;
                        data: number[] | {
                            x: number;
                            y: number;
                            z: number;
                        }[];
                        hidden: boolean | undefined;
                    }[];
                };
            };
        } | {
            code: string;
        } | {
            label: string;
            light: string;
            dark: string;
            highContrast: string;
        };
        caption: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        captionHidden: boolean | undefined;
        variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
    } | {
        label: string;
        tabs: {
            tab: {
                label: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            };
            panel: ({
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                level: number | undefined;
            } | {
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            } | {
                media: {
                    label: string;
                    illustration: "default" | "empty" | "error" | "hello" | "thanks";
                } | {
                    label: string;
                    chart: {
                        type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                        data: {
                            labels: string[];
                            datasets: {
                                label: string;
                                data: number[] | {
                                    x: number;
                                    y: number;
                                    z: number;
                                }[];
                                hidden: boolean | undefined;
                            }[];
                        };
                    };
                } | {
                    code: string;
                } | {
                    label: string;
                    light: string;
                    dark: string;
                    highContrast: string;
                };
                caption: (string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[]) | undefined;
                captionHidden: boolean | undefined;
                variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
            } | {
                inputs: ({
                    label: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    actionId: string;
                    required: boolean | undefined;
                    initialValue: string | undefined;
                    type: "text";
                    placeholder: string | undefined;
                    inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                    before: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    after: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    multiline: false | undefined;
                } | {
                    type: "button";
                    label: string;
                    actionId: string;
                    variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                    size: ("small" | "medium" | "large") | undefined;
                    iconOnly: boolean | undefined;
                    icon: string | undefined;
                    iconPosition: ("before" | "after") | undefined;
                    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    iconVariant: ("filled" | "outline") | undefined;
                })[];
                variant: ("flex" | "narrow-block") | undefined;
            } | {
                descriptionList: {
                    title: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    description: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                }[];
            })[];
        }[];
        tabVariant: ("subtle" | "transparent") | undefined;
        tabListVariant: ("start" | "center") | undefined;
    } | {
        inputs: ({
            label: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            actionId: string;
            required: boolean | undefined;
            initialValue: string | undefined;
            type: "text";
            placeholder: string | undefined;
            inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
            before: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            after: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            multiline: false | undefined;
        } | {
            type: "button";
            label: string;
            actionId: string;
            variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
            size: ("small" | "medium" | "large") | undefined;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            iconVariant: ("filled" | "outline") | undefined;
        })[];
        variant: ("flex" | "narrow-block") | undefined;
    } | {
        descriptionList: {
            title: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            description: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        }[];
    })[];
} | {
    inputs: ({
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        actionId: string;
        required: boolean | undefined;
        initialValue: string | undefined;
        type: "text";
        placeholder: string | undefined;
        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
        before: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        after: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        multiline: false | undefined;
    } | {
        type: "button";
        label: string;
        actionId: string;
        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
        size: ("small" | "medium" | "large") | undefined;
        iconOnly: boolean | undefined;
        icon: string | undefined;
        iconPosition: ("before" | "after") | undefined;
        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        iconVariant: ("filled" | "outline") | undefined;
    })[];
    variant: ("flex" | "narrow-block") | undefined;
} | {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "text";
    placeholder: string | undefined;
    multiline: true;
} | {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "radio-group";
    options: {
        value: string;
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    }[];
} | {
    message: {
        variant: "big";
        media: ({
            label: string;
            illustration: "default" | "empty" | "error" | "hello" | "thanks";
        } | {
            label: string;
            chart: {
                type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                data: {
                    labels: string[];
                    datasets: {
                        label: string;
                        data: number[] | {
                            x: number;
                            y: number;
                            z: number;
                        }[];
                        hidden: boolean | undefined;
                    }[];
                };
            };
        } | {
            code: string;
        } | {
            label: string;
            light: string;
            dark: string;
            highContrast: string;
        }) | undefined;
        title: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        abstract: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        actions: {
            primary: {
                label: string;
                actionId: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            } | undefined;
            secondary: {
                label: string;
                actionId: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            } | undefined;
            tertiary: {
                label: string;
                actionId: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            } | undefined;
        } | undefined;
        viewportHeight: boolean | undefined;
    };
    level: number | undefined;
};

type CardContentItemEntity = {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    level: number | undefined;
} | {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
} | {
    media: {
        label: string;
        illustration: "default" | "empty" | "error" | "hello" | "thanks";
    } | {
        label: string;
        chart: {
            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
            data: {
                labels: string[];
                datasets: {
                    label: string;
                    data: number[] | {
                        x: number;
                        y: number;
                        z: number;
                    }[];
                    hidden: boolean | undefined;
                }[];
            };
        };
    } | {
        code: string;
    } | {
        label: string;
        light: string;
        dark: string;
        highContrast: string;
    };
    caption: (string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[]) | undefined;
    captionHidden: boolean | undefined;
    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
} | {
    label: string;
    tabs: {
        tab: {
            label: string;
            size: ("small" | "medium" | "large") | undefined;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        };
        panel: ({
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            level: number | undefined;
        } | {
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        } | {
            media: {
                label: string;
                illustration: "default" | "empty" | "error" | "hello" | "thanks";
            } | {
                label: string;
                chart: {
                    type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                    data: {
                        labels: string[];
                        datasets: {
                            label: string;
                            data: number[] | {
                                x: number;
                                y: number;
                                z: number;
                            }[];
                            hidden: boolean | undefined;
                        }[];
                    };
                };
            } | {
                code: string;
            } | {
                label: string;
                light: string;
                dark: string;
                highContrast: string;
            };
            caption: (string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[]) | undefined;
            captionHidden: boolean | undefined;
            variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
        } | {
            inputs: ({
                label: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                actionId: string;
                required: boolean | undefined;
                initialValue: string | undefined;
                type: "text";
                placeholder: string | undefined;
                inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                before: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                after: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                multiline: false | undefined;
            } | {
                type: "button";
                label: string;
                actionId: string;
                variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            })[];
            variant: ("flex" | "narrow-block") | undefined;
        } | {
            descriptionList: {
                title: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                description: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            }[];
        })[];
    }[];
    tabVariant: ("subtle" | "transparent") | undefined;
    tabListVariant: ("start" | "center") | undefined;
} | {
    inputs: ({
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        actionId: string;
        required: boolean | undefined;
        initialValue: string | undefined;
        type: "text";
        placeholder: string | undefined;
        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
        before: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        after: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        multiline: false | undefined;
    } | {
        type: "button";
        label: string;
        actionId: string;
        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
        size: ("small" | "medium" | "large") | undefined;
        iconOnly: boolean | undefined;
        icon: string | undefined;
        iconPosition: ("before" | "after") | undefined;
        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        iconVariant: ("filled" | "outline") | undefined;
    })[];
    variant: ("flex" | "narrow-block") | undefined;
} | {
    descriptionList: {
        title: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        description: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    }[];
};

type CardContentItemSequence = ({
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    level: number | undefined;
} | {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
} | {
    media: {
        label: string;
        illustration: "default" | "empty" | "error" | "hello" | "thanks";
    } | {
        label: string;
        chart: {
            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
            data: {
                labels: string[];
                datasets: {
                    label: string;
                    data: number[] | {
                        x: number;
                        y: number;
                        z: number;
                    }[];
                    hidden: boolean | undefined;
                }[];
            };
        };
    } | {
        code: string;
    } | {
        label: string;
        light: string;
        dark: string;
        highContrast: string;
    };
    caption: (string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[]) | undefined;
    captionHidden: boolean | undefined;
    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
} | {
    label: string;
    tabs: {
        tab: {
            label: string;
            size: ("small" | "medium" | "large") | undefined;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        };
        panel: ({
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            level: number | undefined;
        } | {
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        } | {
            media: {
                label: string;
                illustration: "default" | "empty" | "error" | "hello" | "thanks";
            } | {
                label: string;
                chart: {
                    type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                    data: {
                        labels: string[];
                        datasets: {
                            label: string;
                            data: number[] | {
                                x: number;
                                y: number;
                                z: number;
                            }[];
                            hidden: boolean | undefined;
                        }[];
                    };
                };
            } | {
                code: string;
            } | {
                label: string;
                light: string;
                dark: string;
                highContrast: string;
            };
            caption: (string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[]) | undefined;
            captionHidden: boolean | undefined;
            variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
        } | {
            inputs: ({
                label: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                actionId: string;
                required: boolean | undefined;
                initialValue: string | undefined;
                type: "text";
                placeholder: string | undefined;
                inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                before: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                after: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                multiline: false | undefined;
            } | {
                type: "button";
                label: string;
                actionId: string;
                variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            })[];
            variant: ("flex" | "narrow-block") | undefined;
        } | {
            descriptionList: {
                title: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                description: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            }[];
        })[];
    }[];
    tabVariant: ("subtle" | "transparent") | undefined;
    tabListVariant: ("start" | "center") | undefined;
} | {
    inputs: ({
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        actionId: string;
        required: boolean | undefined;
        initialValue: string | undefined;
        type: "text";
        placeholder: string | undefined;
        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
        before: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        after: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        multiline: false | undefined;
    } | {
        type: "button";
        label: string;
        actionId: string;
        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
        size: ("small" | "medium" | "large") | undefined;
        iconOnly: boolean | undefined;
        icon: string | undefined;
        iconPosition: ("before" | "after") | undefined;
        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        iconVariant: ("filled" | "outline") | undefined;
    })[];
    variant: ("flex" | "narrow-block") | undefined;
} | {
    descriptionList: {
        title: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        description: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    }[];
})[];

type CardProps = {
    card: ({
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        level: number | undefined;
    } | {
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    } | {
        media: {
            label: string;
            illustration: "default" | "empty" | "error" | "hello" | "thanks";
        } | {
            label: string;
            chart: {
                type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                data: {
                    labels: string[];
                    datasets: {
                        label: string;
                        data: number[] | {
                            x: number;
                            y: number;
                            z: number;
                        }[];
                        hidden: boolean | undefined;
                    }[];
                };
            };
        } | {
            code: string;
        } | {
            label: string;
            light: string;
            dark: string;
            highContrast: string;
        };
        caption: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        captionHidden: boolean | undefined;
        variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
    } | {
        label: string;
        tabs: {
            tab: {
                label: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            };
            panel: ({
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                level: number | undefined;
            } | {
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            } | {
                media: {
                    label: string;
                    illustration: "default" | "empty" | "error" | "hello" | "thanks";
                } | {
                    label: string;
                    chart: {
                        type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                        data: {
                            labels: string[];
                            datasets: {
                                label: string;
                                data: number[] | {
                                    x: number;
                                    y: number;
                                    z: number;
                                }[];
                                hidden: boolean | undefined;
                            }[];
                        };
                    };
                } | {
                    code: string;
                } | {
                    label: string;
                    light: string;
                    dark: string;
                    highContrast: string;
                };
                caption: (string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[]) | undefined;
                captionHidden: boolean | undefined;
                variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
            } | {
                inputs: ({
                    label: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    actionId: string;
                    required: boolean | undefined;
                    initialValue: string | undefined;
                    type: "text";
                    placeholder: string | undefined;
                    inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                    before: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    after: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    multiline: false | undefined;
                } | {
                    type: "button";
                    label: string;
                    actionId: string;
                    variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                    size: ("small" | "medium" | "large") | undefined;
                    iconOnly: boolean | undefined;
                    icon: string | undefined;
                    iconPosition: ("before" | "after") | undefined;
                    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    iconVariant: ("filled" | "outline") | undefined;
                })[];
                variant: ("flex" | "narrow-block") | undefined;
            } | {
                descriptionList: {
                    title: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    description: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                }[];
            })[];
        }[];
        tabVariant: ("subtle" | "transparent") | undefined;
        tabListVariant: ("start" | "center") | undefined;
    } | {
        inputs: ({
            label: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            actionId: string;
            required: boolean | undefined;
            initialValue: string | undefined;
            type: "text";
            placeholder: string | undefined;
            inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
            before: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            after: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            multiline: false | undefined;
        } | {
            type: "button";
            label: string;
            actionId: string;
            variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
            size: ("small" | "medium" | "large") | undefined;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            iconVariant: ("filled" | "outline") | undefined;
        })[];
        variant: ("flex" | "narrow-block") | undefined;
    } | {
        descriptionList: {
            title: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            description: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        }[];
    })[];
};

type DescriptionListItemProps = {
    title: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    description: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
};

type DescriptionListProps = {
    descriptionList: {
        title: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        description: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    }[];
};

type FigureProps = {
    media: {
        label: string;
        illustration: "default" | "empty" | "error" | "hello" | "thanks";
    } | {
        label: string;
        chart: {
            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
            data: {
                labels: string[];
                datasets: {
                    label: string;
                    data: number[] | {
                        x: number;
                        y: number;
                        z: number;
                    }[];
                    hidden: boolean | undefined;
                }[];
            };
        };
    } | {
        code: string;
    } | {
        label: string;
        light: string;
        dark: string;
        highContrast: string;
    };
    caption: (string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[]) | undefined;
    captionHidden: boolean | undefined;
    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
};

type HeadingLevel = number;

type HeadingProps = {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    level: number | undefined;
};

type LayoutItemEntity = {
    card: ({
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        level: number | undefined;
    } | {
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    } | {
        media: {
            label: string;
            illustration: "default" | "empty" | "error" | "hello" | "thanks";
        } | {
            label: string;
            chart: {
                type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                data: {
                    labels: string[];
                    datasets: {
                        label: string;
                        data: number[] | {
                            x: number;
                            y: number;
                            z: number;
                        }[];
                        hidden: boolean | undefined;
                    }[];
                };
            };
        } | {
            code: string;
        } | {
            label: string;
            light: string;
            dark: string;
            highContrast: string;
        };
        caption: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        captionHidden: boolean | undefined;
        variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
    } | {
        label: string;
        tabs: {
            tab: {
                label: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            };
            panel: ({
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                level: number | undefined;
            } | {
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            } | {
                media: {
                    label: string;
                    illustration: "default" | "empty" | "error" | "hello" | "thanks";
                } | {
                    label: string;
                    chart: {
                        type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                        data: {
                            labels: string[];
                            datasets: {
                                label: string;
                                data: number[] | {
                                    x: number;
                                    y: number;
                                    z: number;
                                }[];
                                hidden: boolean | undefined;
                            }[];
                        };
                    };
                } | {
                    code: string;
                } | {
                    label: string;
                    light: string;
                    dark: string;
                    highContrast: string;
                };
                caption: (string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[]) | undefined;
                captionHidden: boolean | undefined;
                variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
            } | {
                inputs: ({
                    label: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    actionId: string;
                    required: boolean | undefined;
                    initialValue: string | undefined;
                    type: "text";
                    placeholder: string | undefined;
                    inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                    before: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    after: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    multiline: false | undefined;
                } | {
                    type: "button";
                    label: string;
                    actionId: string;
                    variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                    size: ("small" | "medium" | "large") | undefined;
                    iconOnly: boolean | undefined;
                    icon: string | undefined;
                    iconPosition: ("before" | "after") | undefined;
                    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    iconVariant: ("filled" | "outline") | undefined;
                })[];
                variant: ("flex" | "narrow-block") | undefined;
            } | {
                descriptionList: {
                    title: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    description: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                }[];
            })[];
        }[];
        tabVariant: ("subtle" | "transparent") | undefined;
        tabListVariant: ("start" | "center") | undefined;
    } | {
        inputs: ({
            label: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            actionId: string;
            required: boolean | undefined;
            initialValue: string | undefined;
            type: "text";
            placeholder: string | undefined;
            inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
            before: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            after: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            multiline: false | undefined;
        } | {
            type: "button";
            label: string;
            actionId: string;
            variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
            size: ("small" | "medium" | "large") | undefined;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            iconVariant: ("filled" | "outline") | undefined;
        })[];
        variant: ("flex" | "narrow-block") | undefined;
    } | {
        descriptionList: {
            title: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            description: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        }[];
    })[];
};

type LayoutVariant = "grid" | "flex";

type LayoutItemProps = {
    item: {
        card: ({
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            level: number | undefined;
        } | {
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        } | {
            media: {
                label: string;
                illustration: "default" | "empty" | "error" | "hello" | "thanks";
            } | {
                label: string;
                chart: {
                    type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                    data: {
                        labels: string[];
                        datasets: {
                            label: string;
                            data: number[] | {
                                x: number;
                                y: number;
                                z: number;
                            }[];
                            hidden: boolean | undefined;
                        }[];
                    };
                };
            } | {
                code: string;
            } | {
                label: string;
                light: string;
                dark: string;
                highContrast: string;
            };
            caption: (string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[]) | undefined;
            captionHidden: boolean | undefined;
            variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
        } | {
            label: string;
            tabs: {
                tab: {
                    label: string;
                    size: ("small" | "medium" | "large") | undefined;
                    iconOnly: boolean | undefined;
                    icon: string | undefined;
                    iconPosition: ("before" | "after") | undefined;
                    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                };
                panel: ({
                    paragraph: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    level: number | undefined;
                } | {
                    paragraph: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                } | {
                    media: {
                        label: string;
                        illustration: "default" | "empty" | "error" | "hello" | "thanks";
                    } | {
                        label: string;
                        chart: {
                            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                            data: {
                                labels: string[];
                                datasets: {
                                    label: string;
                                    data: number[] | {
                                        x: number;
                                        y: number;
                                        z: number;
                                    }[];
                                    hidden: boolean | undefined;
                                }[];
                            };
                        };
                    } | {
                        code: string;
                    } | {
                        label: string;
                        light: string;
                        dark: string;
                        highContrast: string;
                    };
                    caption: (string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[]) | undefined;
                    captionHidden: boolean | undefined;
                    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
                } | {
                    inputs: ({
                        label: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                        actionId: string;
                        required: boolean | undefined;
                        initialValue: string | undefined;
                        type: "text";
                        placeholder: string | undefined;
                        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                        before: (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        }) | undefined;
                        after: (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        }) | undefined;
                        multiline: false | undefined;
                    } | {
                        type: "button";
                        label: string;
                        actionId: string;
                        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                        size: ("small" | "medium" | "large") | undefined;
                        iconOnly: boolean | undefined;
                        icon: string | undefined;
                        iconPosition: ("before" | "after") | undefined;
                        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        iconVariant: ("filled" | "outline") | undefined;
                    })[];
                    variant: ("flex" | "narrow-block") | undefined;
                } | {
                    descriptionList: {
                        title: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                        description: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                    }[];
                })[];
            }[];
            tabVariant: ("subtle" | "transparent") | undefined;
            tabListVariant: ("start" | "center") | undefined;
        } | {
            inputs: ({
                label: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                actionId: string;
                required: boolean | undefined;
                initialValue: string | undefined;
                type: "text";
                placeholder: string | undefined;
                inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                before: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                after: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                multiline: false | undefined;
            } | {
                type: "button";
                label: string;
                actionId: string;
                variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            })[];
            variant: ("flex" | "narrow-block") | undefined;
        } | {
            descriptionList: {
                title: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                description: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            }[];
        })[];
    };
    inlineSizeFactor: (1 | 2) | undefined;
    blockSizeFactor: (1 | 2) | undefined;
};

type LayoutProps = {
    layout: {
        variant: "grid" | "flex";
        items: {
            item: {
                card: ({
                    paragraph: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    level: number | undefined;
                } | {
                    paragraph: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                } | {
                    media: {
                        label: string;
                        illustration: "default" | "empty" | "error" | "hello" | "thanks";
                    } | {
                        label: string;
                        chart: {
                            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                            data: {
                                labels: string[];
                                datasets: {
                                    label: string;
                                    data: number[] | {
                                        x: number;
                                        y: number;
                                        z: number;
                                    }[];
                                    hidden: boolean | undefined;
                                }[];
                            };
                        };
                    } | {
                        code: string;
                    } | {
                        label: string;
                        light: string;
                        dark: string;
                        highContrast: string;
                    };
                    caption: (string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[]) | undefined;
                    captionHidden: boolean | undefined;
                    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
                } | {
                    label: string;
                    tabs: {
                        tab: {
                            label: string;
                            size: ("small" | "medium" | "large") | undefined;
                            iconOnly: boolean | undefined;
                            icon: string | undefined;
                            iconPosition: ("before" | "after") | undefined;
                            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        };
                        panel: ({
                            paragraph: string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[];
                            level: number | undefined;
                        } | {
                            paragraph: string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[];
                        } | {
                            media: {
                                label: string;
                                illustration: "default" | "empty" | "error" | "hello" | "thanks";
                            } | {
                                label: string;
                                chart: {
                                    type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                                    data: {
                                        labels: string[];
                                        datasets: {
                                            label: string;
                                            data: number[] | {
                                                x: number;
                                                y: number;
                                                z: number;
                                            }[];
                                            hidden: boolean | undefined;
                                        }[];
                                    };
                                };
                            } | {
                                code: string;
                            } | {
                                label: string;
                                light: string;
                                dark: string;
                                highContrast: string;
                            };
                            caption: (string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[]) | undefined;
                            captionHidden: boolean | undefined;
                            variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
                        } | {
                            inputs: ({
                                label: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                                actionId: string;
                                required: boolean | undefined;
                                initialValue: string | undefined;
                                type: "text";
                                placeholder: string | undefined;
                                inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                                before: (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                }) | undefined;
                                after: (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                }) | undefined;
                                multiline: false | undefined;
                            } | {
                                type: "button";
                                label: string;
                                actionId: string;
                                variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                                size: ("small" | "medium" | "large") | undefined;
                                iconOnly: boolean | undefined;
                                icon: string | undefined;
                                iconPosition: ("before" | "after") | undefined;
                                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                iconVariant: ("filled" | "outline") | undefined;
                            })[];
                            variant: ("flex" | "narrow-block") | undefined;
                        } | {
                            descriptionList: {
                                title: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                                description: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                            }[];
                        })[];
                    }[];
                    tabVariant: ("subtle" | "transparent") | undefined;
                    tabListVariant: ("start" | "center") | undefined;
                } | {
                    inputs: ({
                        label: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                        actionId: string;
                        required: boolean | undefined;
                        initialValue: string | undefined;
                        type: "text";
                        placeholder: string | undefined;
                        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                        before: (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        }) | undefined;
                        after: (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        }) | undefined;
                        multiline: false | undefined;
                    } | {
                        type: "button";
                        label: string;
                        actionId: string;
                        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                        size: ("small" | "medium" | "large") | undefined;
                        iconOnly: boolean | undefined;
                        icon: string | undefined;
                        iconPosition: ("before" | "after") | undefined;
                        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        iconVariant: ("filled" | "outline") | undefined;
                    })[];
                    variant: ("flex" | "narrow-block") | undefined;
                } | {
                    descriptionList: {
                        title: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                        description: string | (string | {
                            text: string;
                            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                        } | {
                            icon: string;
                            variant: ("filled" | "outline") | undefined;
                            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        })[];
                    }[];
                })[];
            };
            inlineSizeFactor: (1 | 2) | undefined;
            blockSizeFactor: (1 | 2) | undefined;
        }[];
    };
};

type ParagraphProps = {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
};

type ShortInputEntity = {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "text";
    placeholder: string | undefined;
    inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
    before: (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    }) | undefined;
    after: (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    }) | undefined;
    multiline: false | undefined;
} | {
    type: "button";
    label: string;
    actionId: string;
    variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
    size: ("small" | "medium" | "large") | undefined;
    iconOnly: boolean | undefined;
    icon: string | undefined;
    iconPosition: ("before" | "after") | undefined;
    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    iconVariant: ("filled" | "outline") | undefined;
};

type ShortInputSequence = ({
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "text";
    placeholder: string | undefined;
    inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
    before: (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    }) | undefined;
    after: (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    }) | undefined;
    multiline: false | undefined;
} | {
    type: "button";
    label: string;
    actionId: string;
    variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
    size: ("small" | "medium" | "large") | undefined;
    iconOnly: boolean | undefined;
    icon: string | undefined;
    iconPosition: ("before" | "after") | undefined;
    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    iconVariant: ("filled" | "outline") | undefined;
})[];

type ShortInputsProps = {
    inputs: ({
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        actionId: string;
        required: boolean | undefined;
        initialValue: string | undefined;
        type: "text";
        placeholder: string | undefined;
        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
        before: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        after: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        multiline: false | undefined;
    } | {
        type: "button";
        label: string;
        actionId: string;
        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
        size: ("small" | "medium" | "large") | undefined;
        iconOnly: boolean | undefined;
        icon: string | undefined;
        iconPosition: ("before" | "after") | undefined;
        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        iconVariant: ("filled" | "outline") | undefined;
    })[];
    variant: ("flex" | "narrow-block") | undefined;
};

type TabProps = {
    label: string;
    size: ("small" | "medium" | "large") | undefined;
    iconOnly: boolean | undefined;
    icon: string | undefined;
    iconPosition: ("before" | "after") | undefined;
    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
};

type TabPanelItemEntity = {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    level: number | undefined;
} | {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
} | {
    media: {
        label: string;
        illustration: "default" | "empty" | "error" | "hello" | "thanks";
    } | {
        label: string;
        chart: {
            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
            data: {
                labels: string[];
                datasets: {
                    label: string;
                    data: number[] | {
                        x: number;
                        y: number;
                        z: number;
                    }[];
                    hidden: boolean | undefined;
                }[];
            };
        };
    } | {
        code: string;
    } | {
        label: string;
        light: string;
        dark: string;
        highContrast: string;
    };
    caption: (string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[]) | undefined;
    captionHidden: boolean | undefined;
    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
} | {
    inputs: ({
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        actionId: string;
        required: boolean | undefined;
        initialValue: string | undefined;
        type: "text";
        placeholder: string | undefined;
        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
        before: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        after: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        multiline: false | undefined;
    } | {
        type: "button";
        label: string;
        actionId: string;
        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
        size: ("small" | "medium" | "large") | undefined;
        iconOnly: boolean | undefined;
        icon: string | undefined;
        iconPosition: ("before" | "after") | undefined;
        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        iconVariant: ("filled" | "outline") | undefined;
    })[];
    variant: ("flex" | "narrow-block") | undefined;
} | {
    descriptionList: {
        title: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        description: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    }[];
};

type TabPanelItemSequence = ({
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    level: number | undefined;
} | {
    paragraph: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
} | {
    media: {
        label: string;
        illustration: "default" | "empty" | "error" | "hello" | "thanks";
    } | {
        label: string;
        chart: {
            type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
            data: {
                labels: string[];
                datasets: {
                    label: string;
                    data: number[] | {
                        x: number;
                        y: number;
                        z: number;
                    }[];
                    hidden: boolean | undefined;
                }[];
            };
        };
    } | {
        code: string;
    } | {
        label: string;
        light: string;
        dark: string;
        highContrast: string;
    };
    caption: (string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[]) | undefined;
    captionHidden: boolean | undefined;
    variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
} | {
    inputs: ({
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        actionId: string;
        required: boolean | undefined;
        initialValue: string | undefined;
        type: "text";
        placeholder: string | undefined;
        inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
        before: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        after: (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        }) | undefined;
        multiline: false | undefined;
    } | {
        type: "button";
        label: string;
        actionId: string;
        variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
        size: ("small" | "medium" | "large") | undefined;
        iconOnly: boolean | undefined;
        icon: string | undefined;
        iconPosition: ("before" | "after") | undefined;
        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        iconVariant: ("filled" | "outline") | undefined;
    })[];
    variant: ("flex" | "narrow-block") | undefined;
} | {
    descriptionList: {
        title: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        description: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    }[];
})[];

type TabsItemProps = {
    tab: {
        label: string;
        size: ("small" | "medium" | "large") | undefined;
        iconOnly: boolean | undefined;
        icon: string | undefined;
        iconPosition: ("before" | "after") | undefined;
        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    };
    panel: ({
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
        level: number | undefined;
    } | {
        paragraph: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    } | {
        media: {
            label: string;
            illustration: "default" | "empty" | "error" | "hello" | "thanks";
        } | {
            label: string;
            chart: {
                type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                data: {
                    labels: string[];
                    datasets: {
                        label: string;
                        data: number[] | {
                            x: number;
                            y: number;
                            z: number;
                        }[];
                        hidden: boolean | undefined;
                    }[];
                };
            };
        } | {
            code: string;
        } | {
            label: string;
            light: string;
            dark: string;
            highContrast: string;
        };
        caption: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        captionHidden: boolean | undefined;
        variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
    } | {
        inputs: ({
            label: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            actionId: string;
            required: boolean | undefined;
            initialValue: string | undefined;
            type: "text";
            placeholder: string | undefined;
            inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
            before: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            after: (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            }) | undefined;
            multiline: false | undefined;
        } | {
            type: "button";
            label: string;
            actionId: string;
            variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
            size: ("small" | "medium" | "large") | undefined;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            iconVariant: ("filled" | "outline") | undefined;
        })[];
        variant: ("flex" | "narrow-block") | undefined;
    } | {
        descriptionList: {
            title: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            description: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        }[];
    })[];
};

type TabsProps = {
    label: string;
    tabs: {
        tab: {
            label: string;
            size: ("small" | "medium" | "large") | undefined;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        };
        panel: ({
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
            level: number | undefined;
        } | {
            paragraph: string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[];
        } | {
            media: {
                label: string;
                illustration: "default" | "empty" | "error" | "hello" | "thanks";
            } | {
                label: string;
                chart: {
                    type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                    data: {
                        labels: string[];
                        datasets: {
                            label: string;
                            data: number[] | {
                                x: number;
                                y: number;
                                z: number;
                            }[];
                            hidden: boolean | undefined;
                        }[];
                    };
                };
            } | {
                code: string;
            } | {
                label: string;
                light: string;
                dark: string;
                highContrast: string;
            };
            caption: (string | (string | {
                text: string;
                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
            } | {
                icon: string;
                variant: ("filled" | "outline") | undefined;
                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            })[]) | undefined;
            captionHidden: boolean | undefined;
            variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
        } | {
            inputs: ({
                label: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                actionId: string;
                required: boolean | undefined;
                initialValue: string | undefined;
                type: "text";
                placeholder: string | undefined;
                inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                before: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                after: (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                }) | undefined;
                multiline: false | undefined;
            } | {
                type: "button";
                label: string;
                actionId: string;
                variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                iconVariant: ("filled" | "outline") | undefined;
            })[];
            variant: ("flex" | "narrow-block") | undefined;
        } | {
            descriptionList: {
                title: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                description: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            }[];
        })[];
    }[];
    tabVariant: ("subtle" | "transparent") | undefined;
    tabListVariant: ("start" | "center") | undefined;
};

type ToolbarAction = {
    type: "action";
    label: string;
    actionId: string;
    iconOnly: boolean | undefined;
    icon: string | undefined;
    iconPosition: ("before" | "after") | undefined;
    iconVariant: ("filled" | "outline") | undefined;
};

type ToolbarDivider = {
    type: "divider";
    variant: ("line" | "flex-space") | undefined;
};

type ToolbarItemEntity = {
    type: "action";
    label: string;
    actionId: string;
    iconOnly: boolean | undefined;
    icon: string | undefined;
    iconPosition: ("before" | "after") | undefined;
    iconVariant: ("filled" | "outline") | undefined;
} | {
    type: "divider";
    variant: ("line" | "flex-space") | undefined;
};

type ToolbarItemSequence = ({
    type: "action";
    label: string;
    actionId: string;
    iconOnly: boolean | undefined;
    icon: string | undefined;
    iconPosition: ("before" | "after") | undefined;
    iconVariant: ("filled" | "outline") | undefined;
} | {
    type: "divider";
    variant: ("line" | "flex-space") | undefined;
})[];

type ToolbarProps = {
    toolbar: {
        items: ({
            type: "action";
            label: string;
            actionId: string;
            iconOnly: boolean | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconVariant: ("filled" | "outline") | undefined;
        } | {
            type: "divider";
            variant: ("line" | "flex-space") | undefined;
        })[];
        iconSize: ((10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48")) | undefined;
        buttonSize: (("small" | "medium" | "large")) | undefined;
    };
};

type WidgetProps = {
    widget: {
        label: string;
        tabs: {
            tab: {
                label: string;
                size: ("small" | "medium" | "large") | undefined;
                iconOnly: boolean | undefined;
                icon: string | undefined;
                iconPosition: ("before" | "after") | undefined;
                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            };
            panel: ({
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
                level: number | undefined;
            } | {
                paragraph: string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[];
            } | {
                media: {
                    label: string;
                    illustration: "default" | "empty" | "error" | "hello" | "thanks";
                } | {
                    label: string;
                    chart: {
                        type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                        data: {
                            labels: string[];
                            datasets: {
                                label: string;
                                data: number[] | {
                                    x: number;
                                    y: number;
                                    z: number;
                                }[];
                                hidden: boolean | undefined;
                            }[];
                        };
                    };
                } | {
                    code: string;
                } | {
                    label: string;
                    light: string;
                    dark: string;
                    highContrast: string;
                };
                caption: (string | (string | {
                    text: string;
                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                } | {
                    icon: string;
                    variant: ("filled" | "outline") | undefined;
                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                })[]) | undefined;
                captionHidden: boolean | undefined;
                variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
            } | {
                inputs: ({
                    label: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    actionId: string;
                    required: boolean | undefined;
                    initialValue: string | undefined;
                    type: "text";
                    placeholder: string | undefined;
                    inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                    before: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    after: (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    }) | undefined;
                    multiline: false | undefined;
                } | {
                    type: "button";
                    label: string;
                    actionId: string;
                    variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                    size: ("small" | "medium" | "large") | undefined;
                    iconOnly: boolean | undefined;
                    icon: string | undefined;
                    iconPosition: ("before" | "after") | undefined;
                    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    iconVariant: ("filled" | "outline") | undefined;
                })[];
                variant: ("flex" | "narrow-block") | undefined;
            } | {
                descriptionList: {
                    title: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                    description: string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[];
                }[];
            })[];
        }[];
        title: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        abstract: (string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[]) | undefined;
        footerAction: {
            label: string;
            actionId: string;
            size: ("small" | "medium" | "large") | undefined;
            icon: string | undefined;
            iconPosition: ("before" | "after") | undefined;
            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
            iconVariant: ("filled" | "outline") | undefined;
        } | undefined;
    };
};

type DashboardProps = {
    dashboard: {
        items: {
            inlineSizeFactor: (1 | 2) | undefined;
            blockSizeFactor: (1 | 2) | undefined;
            item: {
                widget: {
                    label: string;
                    tabs: {
                        tab: {
                            label: string;
                            size: ("small" | "medium" | "large") | undefined;
                            iconOnly: boolean | undefined;
                            icon: string | undefined;
                            iconPosition: ("before" | "after") | undefined;
                            iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        };
                        panel: ({
                            paragraph: string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[];
                            level: number | undefined;
                        } | {
                            paragraph: string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[];
                        } | {
                            media: {
                                label: string;
                                illustration: "default" | "empty" | "error" | "hello" | "thanks";
                            } | {
                                label: string;
                                chart: {
                                    type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
                                    data: {
                                        labels: string[];
                                        datasets: {
                                            label: string;
                                            data: number[] | {
                                                x: number;
                                                y: number;
                                                z: number;
                                            }[];
                                            hidden: boolean | undefined;
                                        }[];
                                    };
                                };
                            } | {
                                code: string;
                            } | {
                                label: string;
                                light: string;
                                dark: string;
                                highContrast: string;
                            };
                            caption: (string | (string | {
                                text: string;
                                variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                            } | {
                                icon: string;
                                variant: ("filled" | "outline") | undefined;
                                size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                            })[]) | undefined;
                            captionHidden: boolean | undefined;
                            variant: ("viewportWidth" | "textWidth" | "narrow") | undefined;
                        } | {
                            inputs: ({
                                label: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                                actionId: string;
                                required: boolean | undefined;
                                initialValue: string | undefined;
                                type: "text";
                                placeholder: string | undefined;
                                inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
                                before: (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                }) | undefined;
                                after: (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                }) | undefined;
                                multiline: false | undefined;
                            } | {
                                type: "button";
                                label: string;
                                actionId: string;
                                variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
                                size: ("small" | "medium" | "large") | undefined;
                                iconOnly: boolean | undefined;
                                icon: string | undefined;
                                iconPosition: ("before" | "after") | undefined;
                                iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                iconVariant: ("filled" | "outline") | undefined;
                            })[];
                            variant: ("flex" | "narrow-block") | undefined;
                        } | {
                            descriptionList: {
                                title: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                                description: string | (string | {
                                    text: string;
                                    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                                } | {
                                    icon: string;
                                    variant: ("filled" | "outline") | undefined;
                                    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                                })[];
                            }[];
                        })[];
                    }[];
                    title: (string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[]) | undefined;
                    abstract: (string | (string | {
                        text: string;
                        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
                    } | {
                        icon: string;
                        variant: ("filled" | "outline") | undefined;
                        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                    })[]) | undefined;
                    footerAction: {
                        label: string;
                        actionId: string;
                        size: ("small" | "medium" | "large") | undefined;
                        icon: string | undefined;
                        iconPosition: ("before" | "after") | undefined;
                        iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
                        iconVariant: ("filled" | "outline") | undefined;
                    } | undefined;
                };
            };
        }[];
    };
};

type IconVariant = "filled" | "outline";

type IconSize = 10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48";

type IconProps = {
    icon: string;
    variant: ("filled" | "outline") | undefined;
    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
};

type TextProps = {
    text: string;
    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
};

type InlineEntity = string | {
    text: string;
    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
} | {
    icon: string;
    variant: ("filled" | "outline") | undefined;
    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
};

type InlineSequence = (string | {
    text: string;
    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
} | {
    icon: string;
    variant: ("filled" | "outline") | undefined;
    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
})[];

type InlineSequenceOrString = string | (string | {
    text: string;
    variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
} | {
    icon: string;
    variant: ("filled" | "outline") | undefined;
    size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
})[];

type InlineContentProps = {
    inlines: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
};

type ButtonActionPayload = {
    type: "activate";
    actionId: string;
};

type ButtonProps = {
    type: "button";
    label: string;
    actionId: string;
    variant: ("outline" | "primary" | "subtle" | "transparent") | undefined;
    size: ("small" | "medium" | "large") | undefined;
    iconOnly: boolean | undefined;
    icon: string | undefined;
    iconPosition: ("before" | "after") | undefined;
    iconSize: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    iconVariant: ("filled" | "outline") | undefined;
};

type MultilineTextInputProps = {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "text";
    placeholder: string | undefined;
    multiline: true;
};

type RadioGroupProps = {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "radio-group";
    options: {
        value: string;
        label: string | (string | {
            text: string;
            variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
        } | {
            icon: string;
            variant: ("filled" | "outline") | undefined;
            size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
        })[];
    }[];
};

type ShortTextInputProps = {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "text";
    placeholder: string | undefined;
    inputType: ("text" | "password" | "search" | "tel" | "email" | "url" | "number" | "time" | "date" | "month" | "week" | "datetime-local") | undefined;
    before: (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    }) | undefined;
    after: (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    }) | undefined;
    multiline: false | undefined;
};

type InputProps = {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
};

type InputPropsWithInitialStringValue = {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
};

type TextInputProps = {
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
    actionId: string;
    required: boolean | undefined;
    initialValue: string | undefined;
    type: "text";
    placeholder: string | undefined;
};

type LabeledValueProps = {
    value: string;
    label: string | (string | {
        text: string;
        variant: ("normal" | "emphasized" | "strong" | "highlighted" | "code") | undefined;
    } | {
        icon: string;
        variant: ("filled" | "outline") | undefined;
        size: (10 | 12 | 16 | 20 | 24 | 28 | 32 | 48 | "10" | "12" | "16" | "20" | "24" | "28" | "32" | "48") | undefined;
    })[];
};

type ChartTypes = "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";

type BubbleChartDatum = {
    x: number;
    y: number;
    z: number;
};

type ChartDataset = {
    label: string;
    data: number[] | {
        x: number;
        y: number;
        z: number;
    }[];
    hidden: boolean | undefined;
};

type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[] | {
            x: number;
            y: number;
            z: number;
        }[];
        hidden: boolean | undefined;
    }[];
};

type ChartProps = {
    label: string;
    chart: {
        type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
        data: {
            labels: string[];
            datasets: {
                label: string;
                data: number[] | {
                    x: number;
                    y: number;
                    z: number;
                }[];
                hidden: boolean | undefined;
            }[];
        };
    };
};

type CodeProps = {
    code: string;
};

type IllustrationProps = {
    label: string;
    illustration: "default" | "empty" | "error" | "hello" | "thanks";
};

type ImageSrc = string;

type ThemedImageProps = {
    label: string;
    light: string;
    dark: string;
    highContrast: string;
};

type MediaEntity = {
    label: string;
    illustration: "default" | "empty" | "error" | "hello" | "thanks";
} | {
    label: string;
    chart: {
        type: "line" | "line-stacked" | "line-area" | "bar" | "bar-stacked" | "bar-horizontal" | "bar-horizontal-stacked" | "pie" | "doughnut" | "bubble";
        data: {
            labels: string[];
            datasets: {
                label: string;
                data: number[] | {
                    x: number;
                    y: number;
                    z: number;
                }[];
                hidden: boolean | undefined;
            }[];
        };
    };
} | {
    code: string;
} | {
    label: string;
    light: string;
    dark: string;
    highContrast: string;
};

type ActionPayload = {
    type: string;
    actionId: string;
};

type AnyActionPayload = {
    type: string;
    actionId: string;
};

type ThemeName = "light" | "dark" | "highContrast";

type AccentScheme = "web" | "teams";

