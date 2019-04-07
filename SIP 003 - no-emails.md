# SIP 003 - No Email Addresses

Email Addresses are a centralized and sensitive data point.

Since Superalgos will ultimately be a peer to peer network, and will run nodes with full messaging and notification capabilities, email is not strictly required. The native messaging is safer and less invasive, since it is between peers or at least nodes and clients, leaving Google and other central service providers out of the equation.

At minimum, emails should be optional, for notifications only. They should not be involved in either authentication or registration processes.

### Privacy

People naturally do not want their email addresses made public, since that allows anyone to contact them. While one might think the addresses don't need to be made public, it is hard to avoid in a peer to peer network. The nodes and peers need to be able to recognize and contact each other. Any one could also be hacked or otherwise leak data that they have access to. Peers would undoubtedly be safer if this data point was not shared at all.

### Governance

At the same time, people don't generally control their own email address and routing. For instance, `@gmail.com` addresses are controlled by Google. Google can impersonate any of those users, and/or intercept their mail. Various attacks and vulnerabilities ensue from this, including MITM and phishing for yet more information.
