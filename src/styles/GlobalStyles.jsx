import { Global, css } from "@emotion/react";

export const GlobalStyle = ({ theme }) => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }

      html,
      body,
      div,
      span,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }

      html {
        font-family: "GmarketSansMedium";
        color: ${theme.palette.common.black};
        background-color: ${theme.palette.common.background};
      }

      h1 {
        font-family: "TTHakgyoansimMoheomgaB";
        font-size: 52px;
        color: ${theme.palette.common.brown700};
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        font-weight: 500;
        border: 0;
        cursor: pointer;
        color: inherit;
        padding: 0;
        background-color: inherit;
        font: inherit;
        &:disabled {
          cursor: not-allowed;
        }
      }

      input {
        border: 0;
        /* -webkit-appearance: none; */
        border-radius: 0;

        &:focus {
          outline: none;
        }
      }

      .a11y-hidden {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
      }

      .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}
  />
);
