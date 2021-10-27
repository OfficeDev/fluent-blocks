// type InteractionHandler = string | ((payload, event) => any);
// enum ImageIllustration {};
// type ImageSpec = ImageIllustration | { light, dark, "hc.." };
// type ButtonVariant = "subtle" | "transparent";
// function Page() {
//   return (
//     <Section
//       onInteraction={(payload, event) => {
//         const { actionID, subject } = payload;
//         ({
//           "action-id": ({ subject }) => {

//           }
//         })[actionID]?.(payload)
//       }}
//       blocks={[
//         {
//           bigMessage: {
//             title: "",
//             abstract: "",
//             image: {
//               light: "",
//               dark: "",
//               "high-contrast": "",
//             },
//             actions: [
//               {
//                 label: "",
//                 icon: "",
//                 iconLocation: "",
//                 onInteraction: "https://...",
//                 confirm: "Do you want to destroy?",
//                 variant: "secondary"
//               },
//               {
//                 label: "",
//                 icon: "",
//                 iconLocation: "",
//                 onInteraction: () => {
//                   if (confirm()) {
//                     window.location.href = "http://...";
//                   }
//                 }
//               }
//             ]
//           },
//         },
//       ]}
//     />
//   );
// }
