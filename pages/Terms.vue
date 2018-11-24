<template>
  <LayoutMain>
    <div>
      <section class="section">
        <div class="text-container">
          <h1>Terms of Use</h1>
          <h2>1. Website</h2>
          <p>By accessing this website (“the Website”) you accept the terms of use as set out herein. All information is provided of a mere general nature for informational purposes only. By accessing the Website you warrant to the owners, operators contributors and the host thereof, that you may freely without limitation access the Website and all of its contents in your jurisdiction and shall not use the Website and its contents in any way that infringes on laws or the rights of others including those of the aforementioned persons (including the entities they may represent).</p>
          <p>Neither the Website nor any of the persons or entities involved in any way in respect of the Website including its host and its contributors, provide for specific legal, fiscal, economical and/or any other kind of advice or recommendation that may be relied upon. A visitor of the Website will therefore act at its own risk in accessing or in any way relying on the content of the Website and the visitor is therefore solely responsible for any consequences thereof.</p>
          <p>We urge you that prior to any investment, purchase or sale of cryptocurrency or tokens or other instruments based or relying on cryptography, algorithms and/or combinations thereof, you consult with a licensed attorney, tax advisor, investment professional or other advisor specialized in such matters in the relevant jurisdictions.</p>
          <p>The Website does not store, send or receive any cryptocurrency or tokens. Any investment, purchase, sale or other transfer of title of cryptocurrency or tokens (typically) occurs within decentralized cryptocurrency network or on (unregulated) exchanges, and not on the Website which is not affiliated unless explicitly disclosed otherwise on the Website.</p>
          <h2>2. Risk of investment</h2>
          <p>A visitor of the Website should be aware of the risk of investment in cryptocurrency and tokens. The investment in cryptocurrency and tokens can lead to significant (and permanent) loss of money (as generally understood), assets or rights. Cryptocurrency and tokens are susceptible to substantial fluctuations of value and usability and may also alter substantially in nature in the course of time.</p>
          <p>The visitor of the Website should, prior to any investment, purchase, sale of cryptocurrency or tokens determine what fiscal schemes may apply to cryptocurrency, tokens and services relating thereto and what, if any, taxes apply to its intended transaction or holding cryptocurrency and/or tokens. The same applies as regards laws and regulations which may or may in future in the jurisdiction of the visitor of the Website limit or forbid unauthorized or entirely forbid use or any transaction in respect of cryptocurrency and/or tokens or any services relating thereto.</p>
          <p>Visitor of the Website should be aware that laws and regulations about securities in the broadest sense may or may in future also apply to cryptocurrency and/or tokens.</p>
          <h2>3. High-risk profile of cryptocurrency</h2>
          <p>A visitor of the Website should be aware of the high-risk profile of cryptocurrency and tokes and take in particular into account of the following factors (without claim of comprehensiveness):</p>
          <p>1) a user of cryptocurrency, cryptocurrency-related software or services including tokens may be subject to lost, forgotten or stolen passwords or other identifying information required for access; payments or other types of transactions may be sent to wrong (digital) addresses resulting in loss of access and/or other benefits and accidental deletion of so called wallets or accounts;</p>
          <p>2) a user of cryptocurrency, cryptocurrency-related software or services including tokens may be subject to (temporary) security issues which may expose the user to a breach of or unauthorized access to the users’ wallet and/or accounts, potentially resulting in loss or theft of assets;</p>
          <p>3) a user of cryptocurrency-related software or services including tokens may experience (technical) software  issues which may result in unsafe cryptographic libraries, the corruption of wallet files, incorrectly constructed transactions, malware affecting the Website and/or the software used potentially resulting in loss or theft of assets;</p>
          <p>4) a user of cryptocurrency-related hardware used in relationship with cryptocurrency or services including tokens may suffer technical malfunctioning of the hardware, which may result in loss of data or damaged storage devices and potentially access to the cryptocurrency and/or tokens intended to be secured and kept accessible by such hardware, potentially resulting in loss or theft of assets;</p>
          <p>5) a user of cryptocurrency-related software or services including tokens may be subject to third party actions and/or events, which may result in bankruptcy of service providers, security attacks on service providers, and fraudulous conduct by third parties, potentially resulting in loss or theft of assets.</p>
          <h2>4. Intellectual property rights</h2>
          <p>Unless anything to the contrary is explicitly stated on the Website, nothing provided for on the Website is intended to or has the effect of granting the visitor or any third party any proprietary and intellectual property rights whatsoever related to or arising from the Website including (but not limited to):</p>
          <ul>
            <li>a) any domain names, trademarks, trade names, (non-registered) designs, logos, databases, copyrights, neighbouring rights, patents, patentable rights and trade secrets;</li>
            <li>b) any hardware and software, including, without limitation, modifications, enhancements, improvements, updates, patches, builds, derivative works, and processes thereto, regardless whether developed by the owners or contributors of the Website;</li>
            <li>c) any other intellectual property rights, title and interests in and with respect to any and all of the foregoing.</li>
          </ul>
          <h2>5. Limitation of liability</h2>
          <p>The content, data, materials and/or other services on the Website are provided without any warranties of any kind regarding its title, ownership, accuracy, completeness and correctness.</p>
          <p>Specifically, unless otherwise required by law, in no event shall the owners, operators, contributors to or hosts of the Website be liable for any damages of any kind, including, but not limited to, loss of use, loss of assets or rights or privileges, loss of  profits, or loss of data arising out of or in any way connected with the use of the Website and the information thereon from time to time.</p>
          <p>In no way are the owners, operators, contributors to or host of the Website responsible for the actions, decisions, transactions, or other behavior taken or not taken by you or person relying on you in reliance upon the Website and its contents from time to time.</p>
          <h2>6. Applicable law & choice of forum</h2>
          <p>Dutch law exclusively applies to the use of content, data, materials and/or other services provided for on the Website. The court of Amsterdam, the Netherlands, will be the sole and exclusive competent court regarding any dispute relating to or stemming from the use of the Website including, without limitation, in respect of any breach of or dispute in respect of an intellectual property right or similar right as referred to under 4 above, irrespective of the jurisdiction applicable thereto.</p>
          <h2>7 Last amendment</h2>
          <p>These terms of use were amended for the last time on July 4th 2017 and may be altered at any time without prior notice.</p>
        </div>
      </section>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'

export default {
  components: {
    LayoutMain
  },
  head() {
    return {
      title: 'State of the ÐApps — Terms of Use'
    }
  },
  mounted() {
    this.$store.dispatch('setSiteSection', '')
  }
}
</script>
