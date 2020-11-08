const { slugify } = require("../../../lib");
const baseUrl = process.env.URL_PROD;

module.exports.getTemplate = (videos, courses) => {
  const htmlVideos = getHtmlVideos(videos);
  const htmlCourses = getHtmlCourses(courses);
  return `
  <!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <!-- NAME: SELL PRODUCTS -->
          <!--[if gte mso 15]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>The Moti</title>
          
      <style type="text/css">
      p{
        margin:10px 0;
        padding:0;
      }
      table{
        border-collapse:collapse;
      }
      h1,h2,h3,h4,h5,h6{
        display:block;
        margin:0;
        padding:0;
      }
      img,a img{
        border:0;
        height:auto;
        outline:none;
        text-decoration:none;
      }
      body,#bodyTable,#bodyCell{
        height:100%;
        margin:0;
        padding:0;
        width:100%;
      }
      .mcnPreviewText{
        display:none !important;
      }
      #outlook a{
        padding:0;
      }
      img{
        -ms-interpolation-mode:bicubic;
      }
      table{
        mso-table-lspace:0pt;
        mso-table-rspace:0pt;
      }
      .ReadMsgBody{
        width:100%;
      }
      .ExternalClass{
        width:100%;
      }
      p,a,li,td,blockquote{
        mso-line-height-rule:exactly;
      }
      a[href^=tel],a[href^=sms]{
        color:inherit;
        cursor:default;
        text-decoration:none;
      }
      p,a,li,td,body,table,blockquote{
        -ms-text-size-adjust:100%;
        -webkit-text-size-adjust:100%;
      }
      .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
        line-height:100%;
      }
      a[x-apple-data-detectors]{
        color:inherit !important;
        text-decoration:none !important;
        font-size:inherit !important;
        font-family:inherit !important;
        font-weight:inherit !important;
        line-height:inherit !important;
      }
      .templateContainer{
        max-width:650px !important;
      }
      a.mcnButton{
        display:block;
      }
      .mcnImage,.mcnRetinaImage{
        vertical-align:bottom;
      }
      .mcnTextContent{
        word-break:break-word;
      }
      .mcnTextContent img{
        height:auto !important;
      }
      .mcnDividerBlock{
        table-layout:fixed !important;
      }
      h1{
        color:#222222;
        font-family:Helvetica;
        font-size:40px;
        font-style:normal;
        font-weight:bold;
        line-height:150%;
        letter-spacing:normal;
        text-align:center;
      }
      h2{
        color:#222222;
        font-family:Helvetica;
        font-size:34px;
        font-style:normal;
        font-weight:bold;
        line-height:150%;
        letter-spacing:normal;
        text-align:left;
      }
      h3{
        color:#444444;
        font-family:Helvetica;
        font-size:22px;
        font-style:normal;
        font-weight:bold;
        line-height:150%;
        letter-spacing:normal;
        text-align:left;
      }
      h4{
        color:#949494;
        font-family:Georgia;
        font-size:20px;
        font-style:italic;
        font-weight:normal;
        line-height:125%;
        letter-spacing:normal;
        text-align:left;
      }
      #templateHeader{
        background-color:#f50f4c;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:45px;
        padding-bottom:45px;
      }
      .headerContainer{
        background-color:#transparent;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:0;
        padding-bottom:0;
      }
      .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
        color:#757575;
        font-family:Helvetica;
        font-size:14px;
        line-height:150%;
        text-align:left;
      }
      .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
        color:#007C89;
        font-weight:normal;
        text-decoration:underline;
      }
      #templateBody{
        background-color:#FFFFFF;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:36px;
        padding-bottom:45px;
      }
      .bodyContainer{
        background-color:transparent;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:0;
        padding-bottom:0;
      }
      .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
        color:#757575;
        font-family:Helvetica;
        font-size:14px;
        line-height:150%;
        text-align:left;
      }
      .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
        color:#007C89;
        font-weight:normal;
        text-decoration:underline;
      }
      #templateFooter{
        background-color:#333333;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:45px;
        padding-bottom:63px;
      }
      .footerContainer{
        background-color:transparent;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:0;
        padding-bottom:0;
      }
      .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
        color:#FFFFFF;
        font-family:Helvetica;
        font-size:12px;
        line-height:150%;
        text-align:center;
      }
      .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
        color:#FFFFFF;
        font-weight:normal;
        text-decoration:underline;
      }
    @media only screen and (min-width:768px){
      .templateContainer{
        width:650px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      body,table,td,p,a,li,blockquote{
        -webkit-text-size-adjust:none !important;
      }
  
  }	@media only screen and (max-width: 480px){
      body{
        width:100% !important;
        min-width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnRetinaImage{
        max-width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImage{
        width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
        max-width:100% !important;
        width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnBoxedTextContentContainer{
        min-width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageGroupContent{
        padding:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
        padding-top:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
        padding-top:18px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageCardBottomImageContent{
        padding-bottom:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageGroupBlockInner{
        padding-top:0 !important;
        padding-bottom:0 !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageGroupBlockOuter{
        padding-top:9px !important;
        padding-bottom:9px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnTextContent,.mcnBoxedTextContentColumn{
        padding-right:18px !important;
        padding-left:18px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
        padding-right:18px !important;
        padding-bottom:0 !important;
        padding-left:18px !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcpreview-image-uploader{
        display:none !important;
        width:100% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      h1{
        font-size:30px !important;
        line-height:125% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      h2{
        font-size:26px !important;
        line-height:125% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      h3{
        font-size:20px !important;
        line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      h4{
        font-size:18px !important;
        line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
        font-size:14px !important;
        line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
        font-size:16px !important;
        line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
        font-size:16px !important;
        line-height:150% !important;
      }
  
  }	@media only screen and (max-width: 480px){
      .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
        font-size:14px !important;
        line-height:150% !important;
      }
  
  }</style></head>
      <body style="height: 100%;margin: 0;padding: 0;width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
          <!--*|IF:MC_PREVIEW_TEXT|*-->
          <!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;"></span><!--<![endif]-->
          <!--*|END:IF|*-->
          <center>
              <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;">
                  <tr>
                      <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;">
                          <!-- BEGIN TEMPLATE // -->
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <tr>
                                  <td align="center" valign="top" id="templateHeader" data-template-container="" style="background:#fff none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #fff;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 45px;padding-bottom: 45px;">
                                      <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                      <tr>
                                      <td align="center" valign="top" width="600" style="width:600px;">
                                      <![endif]-->
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 650px !important;">
                                          <tr>
                                              <td valign="top" class="headerContainer" style="background:#transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <tbody class="mcnImageBlockOuter">
              <tr>
                  <td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                      <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <tbody><tr>
                              <td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                  
                                      
                                          <img align="center" alt="" src="https://www.themoti.com/img/themoti.png" width="495" style="max-width: 495px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">
                                      
                                  
                              </td>
                          </tr>
                      </tbody></table>
                  </td>
              </tr>
      </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <tbody class="mcnTextBlockOuter">
          <tr>
              <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
          <tr>
          <![endif]-->
            
          <!--[if mso]>
          <td valign="top" width="600" style="width:600px;">
          <![endif]-->
          <!--[if mso]>
          </td>
          <![endif]-->
                  
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
              </td>
          </tr>
      </tbody>
  </table></td>
                                          </tr>
                                      </table>
                                      <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" valign="top" id="templateBody" data-template-container="" style="background:#FFFFFF none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 36px;padding-bottom: 45px;">
                                      <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                      <tr>
                                      <td align="center" valign="top" width="600" style="width:600px;">
                                      <![endif]-->
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 650px !important;">
                                          <tr>
                                              <td valign="top" class="bodyContainer" style="background:transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <tbody class="mcnTextBlockOuter">
          <tr>
              <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <!--[if mso]>
          <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
          <tr>
          <![endif]-->
            
          <!--[if mso]>
          <td valign="top" width="600" style="width:600px;">
          <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                      <tbody><tr>
                          
                          <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;text-align: center!important;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #757575;font-family: Helvetica;font-size: 16px;line-height: 150%;">
                          
                              <h3 style="text-align: center;display: block;margin: 0;padding: 0;color: #444444;font-family: Helvetica;font-size: 18px;font-style: normal;font-weight: bold;line-height: 150%;letter-spacing: normal;">Missed last week's videos? You will find them all below.</h3>
  
  <p style="text-align: center!important;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #757575;font-family: Helvetica;font-size: 16px;line-height: 150%;">Plus, you can find all videos we have ever published on <a href="${baseUrl}" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #007C89;font-weight: normal;text-decoration: underline;"><br/>${baseUrl}</a>.</p>
  
  ${htmlVideos}
  <table class="mcnDividerBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 25px 18px;">
                <table class="mcnDividerContent" style="min-width: 100%;border-top: 2px solid #EAEAEA;" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table><table class="mcnTextBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td class="mcnTextBlockInner" style="padding-top:9px;" valign="top">
              	<!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->
			    
				<!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                    <tbody><tr>
                        
                        <td class="mcnTextContent" style="padding: 0px 18px 9px;color: #222222;font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, Verdana, sans-serif;font-size: 16px;font-style: normal;font-weight: bold;line-height: 100%;text-align: center;" valign="top">
                        
                            <span style="font-size:17px"><span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">Learn how to become an influencer by following The Moti courses.</span></span>
                        </td>
                    </tr>
                </tbody></table>
				<!--[if mso]>
				</td>
				<![endif]-->
                
				<!--[if mso]>
				</tr>
				</table>
				<![endif]-->
            </td>
        </tr>
    </tbody>
</table><table class="mcnDividerBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 9px 18px 0px;">
                <table class="mcnDividerContent" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table><table class="mcnDividerBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnDividerBlockOuter">
        <tr>
            <td class="mcnDividerBlockInner" style="min-width: 100%; padding: 18px 18px 0px;">
                <table class="mcnDividerContent" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody><tr>
                        <td>
                            <span></span>
                        </td>
                    </tr>
                </tbody></table>
<!--            
                <td class="mcnDividerBlockInner" style="padding: 18px;">
                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
-->
            </td>
        </tr>
    </tbody>
</table>
  ${htmlCourses}
  <table class="mcnButtonBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" class="mcnButtonBlockInner" valign="top" align="center">
                <table class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 2px;background: linear-gradient(to right,#6717cd,#2871fa);" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td class="mcnButtonContent" style="font-family: Helvetica; font-size: 18px; padding: 18px;" valign="middle" align="center background: linear-gradient(to right,#6717cd,#2871fa);">
                                <a class="mcnButton " title="Find Out More" href="${baseUrl}/courses" target="_blank" style="font-weight: bold;letter-spacing: -0.5px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF; ">Find Out More</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table></td>
                                        </tr>
                                    </table>
  
                          </td>
                      </tr>
                  </tbody></table>
          <!--[if mso]>
          </td>
          <![endif]-->
                  
          <!--[if mso]>
          </tr>
          </table>
          <![endif]-->
              </td>
          </tr>
      </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
      <tbody class="mcnDividerBlockOuter">
          <tr>
              <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                      <tbody><tr>
                          <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <span></span>
                          </td>
                      </tr>
                  </tbody></table>
  <!--            
                  <td class="mcnDividerBlockInner" style="padding: 18px;">
                  <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
  -->
              </td>
          </tr>
      </tbody>
  </table></td>
                                          </tr>
                                      </table>
                                      <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" valign="top" id="templateFooter" data-template-container="" style="background: #333 none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 45px;padding-bottom: 63px;">
                                      <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                      <tr>
                                      <td align="center" valign="top" width="600" style="width:600px;">
                                      <![endif]-->
                                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 650px !important;">
                                          <tr>
                                              <td valign="top" class="footerContainer" style="background:transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <tbody class="mcnFollowBlockOuter">
      <tr>
      <td align="center" valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowBlockInner">
        <span style="font-size: 17px; color: #FFFFFF;">Follow us on social media</span>
      </td>
    </tr>
          <tr>
              <td align="center" valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowBlockInner">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
      <tbody><tr>
          <td align="center" style="padding-left: 9px;padding-right: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContent">
                  <tbody><tr>
                      <td align="center" valign="top" style="padding-top: 9px;padding-right: 9px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <tbody><tr>
                                  <td align="center" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                      <!--[if mso]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                      <![endif]-->
                                      
                                          <!--[if mso]>
                                          <td align="center" valign="top">
                                          <![endif]-->
                              
                                          
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                  <tbody><tr>
                                                      <td valign="top" style="padding-right: 10px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                              <tbody><tr>
                                                                  <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                          <tbody><tr>
                                                                              
                                                                                  <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                                      <a href="https://www.youtube.com/channel/UCtX6emDHsqY6Ro4fGUcI1og" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-youtube-48.png" alt="YouTube" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>
                                                                                  </td>
                                                                              
                                                                              
                                                                          </tr>
                                                                      </tbody></table>
                                                                  </td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          
                                          <!--[if mso]>
                                          </td>
                                          <![endif]-->
                                      
                                          <!--[if mso]>
                                          <td align="center" valign="top">
                                          <![endif]-->
                                          
                                          
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                  <tbody><tr>
                                                      <td valign="top" style="padding-right: 10px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                              <tbody><tr>
                                                                  <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                          <tbody><tr>
                                                                              
                                                                                  <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                                      <a href="https://www.facebook.com/themoticom/" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png" alt="Facebook" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>
                                                                                  </td>
                                                                              
                                                                              
                                                                          </tr>
                                                                      </tbody></table>
                                                                  </td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          
                                          <!--[if mso]>
                                          </td>
                                          <![endif]-->
                                      
                                          <!--[if mso]>
                                          <td align="center" valign="top">
                                          <![endif]-->
                                          
                                          
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                  <tbody><tr>
                                                      <td valign="top" style="padding-right: 10px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                              <tbody><tr>
                                                                  <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                          <tbody><tr>
                                                                              
                                                                                  <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                                      <a href="https://www.instagram.com/themoticom/" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png" alt="Instagram" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>
                                                                                  </td>
                                                                              
                                                                              
                                                                          </tr>
                                                                      </tbody></table>
                                                                  </td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          
                                          <!--[if mso]>
                                          </td>
                                          <![endif]-->
                                      
                                          <!--[if mso]>
                                          <td align="center" valign="top">
                                          <![endif]-->
                                          
                                          
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                  <tbody><tr>
                                                      <td valign="top" style="padding-right: 10px;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                              <tbody><tr>
                                                                  <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                          <tbody><tr>
                                                                              
                                                                                  <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                                      <a href="https://www.snapchat.com/add/themoticom" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-snapchat-48.png" alt="SnapChat" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>
                                                                                  </td>
                                                                              
                                                                              
                                                                          </tr>
                                                                      </tbody></table>
                                                                  </td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          
                                          <!--[if mso]>
                                          </td>
                                          <![endif]-->
                                      
                                          <!--[if mso]>
                                          <td align="center" valign="top">
                                          <![endif]-->
                                          
                                          
                                              <table align="left" border="0" cellpadding="0" cellspacing="0" style="display: inline;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                  <tbody><tr>
                                                      <td valign="top" style="padding-right: 0;padding-bottom: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnFollowContentItemContainer">
                                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                              <tbody><tr>
                                                                  <td align="left" valign="middle" style="padding-top: 5px;padding-right: 10px;padding-bottom: 5px;padding-left: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                          <tbody><tr>
                                                                              
                                                                                  <td align="center" valign="middle" width="24" class="mcnFollowIconContent" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                                      <a href="http://www.twitter.com/themoticom" target="_blank" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png" alt="Twitter" style="display: block;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" height="24" width="24" class=""></a>
                                                                                  </td>
                                                                              
                                                                              
                                                                          </tr>
                                                                      </tbody></table>
                                                                  </td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          
                                          <!--[if mso]>
                                          </td>
                                          <![endif]-->
                                          <table style="display:inline;" cellspacing="0" cellpadding="0" border="0" align="left">
                                                <tbody><tr>
                                                    <td style="padding-right:0; padding-bottom:9px;" class="mcnFollowContentItemContainer" valign="top">
                                                        <table class="mcnFollowContentItem" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                            <tbody><tr>
                                                                <td style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;" valign="middle" align="left">
                                                                    <table width="" cellspacing="0" cellpadding="0" border="0" align="left">
                                                                        <tbody><tr>
                                                                            
                                                                                <td class="mcnFollowIconContent" width="24" valign="middle" align="center">
                                                                                    <a href="https://www.linkedin.com/company/themoticom" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-linkedin-48.png" alt="LinkedIn" style="display:block;" class="" width="24" height="24"></a>
                                                                                </td>
                                                                            
                                                                            
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        
                                        <!--[if mso]>
                                        </td>
                                        <![endif]-->
                                    
                                    <!--[if mso]>
                                    </tr>
                                    </table>
                                    <![endif]-->
                                      
                                      <!--[if mso]>
                                      </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                              </tr>
                          </tbody></table>
                      </td>
                  </tr>
              </tbody></table>
          </td>
      </tr>
  </tbody></table>
  
              </td>
          </tr>
      </tbody>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
      <tbody class="mcnDividerBlockOuter">
          <tr>
              <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #505050;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                      <tbody><tr>
                          <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <span></span>
                          </td>
                      </tr>
                  </tbody></table>
  <!--            
                  <td class="mcnDividerBlockInner" style="padding: 18px;">
                  <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
  -->
              </td>
          </tr>
      </tbody>
 </table></td>
                                          </tr>
                                      </table>
                                      <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                              </tr>
                          </table>
                          <!-- // END TEMPLATE -->
                      
          </center>
      </body>
  </html>
`;
};

const getHtmlVideos = (videos) => {
  return videos
    .reduce((acc, { ...el }) => {
      if (!acc.length) return [[el]];
      if (acc[acc.length - 1].length < 2) {
        acc[acc.length - 1].push(el);
        return acc;
      }
      acc.push([el]);
      return acc;
    }, [])
    .map((el) => {
      const [el1, el2] = el;
      el1.slug = el1.playlistId
        ? `influencer/${el1.playlistId}/${slugify(el1.title)}`
        : `influencer/video/${slugify(el1.title)}`;
      el2.slug = el2.playlistId
        ? `influencer/${el2.playlistId}/${slugify(el2.title)}`
        : `influencer/video/${slugify(el2.title)}`;
      return `
        <table
          class="mcnCaptionBlock"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody class="mcnCaptionBlockOuter">
            <tr>
              <td class="mcnCaptionBlockInner" style="padding: 9px;" valign="top">
                <table
                  class="mcnCaptionBottomContent"
                  width="282"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  align="left"
                >
                  <tbody>
                    <tr>
                      <td
                        class="mcnCaptionBottomImageContent"
                        style="padding: 0 9px 9px 9px;"
                        valign="top"
                        align="center"
                      >
                        <a
                          href="${baseUrl}/${el1.slug}"
                          title=""
                          class=""
                          target="_blank"
                        >
                          <img
                            alt=""
                            src="${el1.thumbnail}"
                            style="max-width: 320px;"
                            class="mcnImage"
                            width="264"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="mcnTextContent"
                        style="padding: 0 9px 0 9px;"
                        width="282"
                        valign="top"
                      >
                        ${el1.title}<br />
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
    
                <table
                  class="mcnCaptionBottomContent"
                  width="282"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  align="right"
                >
                  <tbody>
                    <tr>
                      <td
                        class="mcnCaptionBottomImageContent"
                        style="padding: 0 9px 9px 9px;"
                        valign="top"
                        align="center"
                      >
                        <a
                          href="${baseUrl}/${el2.slug}"
                          title=""
                          class=""
                          target="_blank"
                        >
                          <img
                            alt=""
                            src="${el2.thumbnail}"
                            style="max-width: 320px;"
                            class="mcnImage"
                            width="264"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="mcnTextContent"
                        style="padding: 0 9px 0 9px;"
                        width="282"
                        valign="top"
                      >
                        ${el2.title}<br />
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>`;
    })
    .join("");
};

const getHtmlCourses = (courses) => {
  const arr =
    courses.length > 0
      ? courses.length % 2 === 0
        ? [...courses]
        : [...courses].slice(0, -1)
      : [];
  return arr
    .reduce((acc, el) => {
      if (!acc.length) return [[el]];
      if (acc[acc.length - 1].length < 2) {
        acc[acc.length - 1].push(el);
        return acc;
      }
      acc.push([el]);
      return acc;
    }, [])
    .map((el) => {
      const [el1, el2] = el;
      return `<table
          class="mcnCaptionBlock"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
        >
          <tbody class="mcnCaptionBlockOuter">
            <tr>
              <td class="mcnCaptionBlockInner" style="padding: 9px;" valign="top">
                <table
                  class="mcnCaptionBottomContent"
                  width="282"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  align="left"
                >
                  <tbody>
                    <tr>
                      <td
                        class="mcnCaptionBottomImageContent"
                        style="padding: 0 9px 9px 9px;"
                        valign="top"
                        align="center"
                      >
                        <a
                          href="${baseUrl}/courses/${el1.slug}"
                          title=""
                          class=""
                          target="_blank"
                        >
                          <img
                            alt=""
                            src="${el1.img}"
                            style="max-width: 320px;"
                            class="mcnImage"
                            width="264"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="mcnTextContent"
                        style="padding: 0 9px 0 9px;"
                        width="282"
                        valign="top"
                      >
                        ${el1.title}<br />
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
    
                <table
                  class="mcnCaptionBottomContent"
                  width="282"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  align="right"
                >
                  <tbody>
                    <tr>
                      <td
                        class="mcnCaptionBottomImageContent"
                        style="padding: 0 9px 9px 9px;"
                        valign="top"
                        align="center"
                      >
                        <a
                          href="${baseUrl}/courses/${el2.slug}"
                          title=""
                          class=""
                          target="_blank"
                        >
                          <img
                            alt=""
                            src="${el2.img}"
                            style="max-width: 320px;"
                            class="mcnImage"
                            width="264"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td
                        class="mcnTextContent"
                        style="padding: 0 9px 0 9px;"
                        width="282"
                        valign="top"
                      >
                        ${el2.title}<br />
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>`;
    })
    .join("");
};
