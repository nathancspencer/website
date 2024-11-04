---
title: 5 Months To Run Code Locally
---

_Nov 2024_

This is my story of an internship at an unnamed financial institution, and a few hundred lines of code I wanted to execute locally.

In my first few weeks at this job I noticed there was a process that every employee had to do, at least weekly, which could be automated trivially.

I took it upon myself to fix this for everyone at the company before I finished. Obvious problem, which everyone had, would definitely save a heap of time.

Should be easy, right?

It took 5 months.

**Trying to Run the Code Myself**

I found an open source repository which did this in a couple hundred lines of C code, and worked fine on my personal machine.

However, despite being a developer at said company, we cannot run code directly on our computers.

They use something like [Google’s Santa](https://github.com/google/santa), which stops you from executing unapproved binaries. That is - you can’t install or write any software on your machine without authorisation. I figured I was probably not smart enough to hack around something designed by the highest paid programmers in the world (built with the express purpose of not letting you hack around it!).

I was warned, presciently, to try everything I can do to figure out a way around it before getting an official security approval.

I realised - as a developer, obviously they have exempted the local compilation and execution of the code in the language I write. Couldn’t I just transpile the C code to whatever language was approved to get it to work?

While that was true, every language approved was being executed in an isolated virtual machine, so the code couldn’t communicate with the local machine’s APIs I needed. I also tried to automate these processes through Apple's built-in Automator, but that was also a dead end as the software hadn’t been approved for internal use.

I realised, reluctantly, the only way I was going to get this done was if I got this software officially security approved.

**Provoking a Review**

So I submitted the Jira ticket for approval of an internal application, with a small essay on why this was valuable to the business (estimating 1 full time employee in productivity savings!).

They rejected it! They said, firstly, that it wasn’t secure since the open source repository I linked was only updated 6 months ago, and that they expect software they onboard to be updated at least 4 times a year to be considered secure. And then they said they didn’t think there was enough demand for it.

This made no sense to me! Given that the dependencies were static, and all the code was executing locally, it makes no difference to security how frequently the repo is updated!

I chatted to another developer I was working with, who said that he also had an application request rejected and thought that they were just finding stupid reasons not to have to go through the work of dealing with the application.

I was determined to give this a go though, so I tried to provoke them to do a security review.

I sent an email to the developer, and got an email back - in like 10 minutes - explaining why the software was, in fact, secure (no internet access, small codebase, doesn’t require system authentication). He sounded confused why I needed a security approval, given it was available for install even with Homebrew. We couldn’t even use that.

I also put up a Slack poll in the biggest channel I could find, and got hundreds of votes, I think about half the department, saying that they also wanted the software. This, finally, persuaded them to do a security review of the software for me.

I found out, later, that the average cost of an internal security review was in the tens of thousands of dollars - more than my full time 6-month internship salary.

**Strange Concerns**

Funnily enough, despite the cost of the review, they wanted me to write a rundown of the security of the application. I did - a diagram of the security dependencies, a link to the open source repository, and left the email on security from the actual developer.

They started complaining about the MIT licence! The SFJKSJFDKL MIT licence!!!

_Permission is hereby granted, free of charge, to any person obtaining a copy of this software_

The wording of “person” might not apply to a “company”?

I’m no lawyer, but given all of their production software used code under the MIT licence, I tried to explain - as politely as I could - that they might have a very big legal problem if that were the case.

Then, in defence, they said that it didn’t look like the exact full MIT licence was in the referenced repository? Surely not, but I checked anyway with the diff tool, and, of course, it was the exact same.

2 months later, they released the results of the security review. They worded it as an “opinion”, interestingly.

**Denied!**

The software - a few hundred lines of C code - was declared a “medium security risk” because the code was not “signed or notarized”.

I had no idea what code signing was! Looking at the security review report, I’m not sure the security consultant knew either. It looked like they had just gone through a checklist of command line scripts which scanned the software, and this particular check failed.

I found out, with a bit of research, it’s like a stamp organisations put on binaries to show that they are trusted.

Which makes sense when you’re generally dealing with black box applications sold by companies, but not with open source applications where you can compile (and therefore trust) the binary yourself and inspect the source code.

It’s kind of funny to think that if I submitted the simplest (and most secure!) program possible - a hello world statement - it would’ve been rejected in the same way.

Anyway, when I asked about how I could go about getting this sorted, to get this redundant stamp on the code, I was directed to chat to the Certificate Management team.

**Detour Offshore**

It took ages to organise a meeting with them. Turns out, the Philippines (where they were based) has twice the number of public holidays as my country, Australia.

A few weeks later, I chatted to them, and they were very confused - it sounded like they thought I was needing cert management for an application for customers to install, rather than internal employees. Apparently they had never onboarded an internal application before.

It seemed like the security consultant had handed me to a random team with no idea on how to actually resolve this problem.

At this point, I was pretty stumped, but I thought it might be worth trying to find the person who onboards these internal applications. I eventually found him, explaining my frustration and not knowing how to resolve this code signing issue. He did something I didn’t expect in my wildest dreams - and actually complained with me about the security team! He said that they raised redundant security issues all the time, and that they just wanted to hit their monthly KPIs.

In fact, code signing was already part of their internal pipeline process for every application they had approved previously, and that he’d probably be able to onboard the software in an afternoon.

The whole official process was a joke. It wouldn’t surprise me if I was the first person to have attempted to get software approved this way. How does a request to the internal application onboarding system get me directed to the customer facing certificate management?

Anyway, I then followed up with this guy - my only hope - and he proceeded to leave me on read three times.

I had a look into their Jira board for onboarding these applications and saw the average time it took to onboard an arbitrary binary was over a year, and warning of how security reviews cost tens of thousands of dollars and not to request unnecessary applications.

5 months later, I had basically given up.

But I happened to be catching up with a higher up, and I mentioned this story to him - and that my internship was finishing in two weeks. And he was like, I know that guy in charge of application onboarding, I’ll mention it to him and get him to onboard it.

**Success!**

One week later, it was approved and available on the internal employee app store.

I installed it! I don’t think I’ve ever had so much joy running such a tiny piece of software.

I understand the need for security restrictions for financial institutions, but it drives me nuts! The difficulty of implementing such a minor program to automate an obvious business process hurts companies like this, and probably why problems like the one I noticed still exist. This blind risk avoidance to insane levels is a company-wide chemotherapy, destroying the good cells as well as the bad.

I also learnt, it’s 50 times better to have someone well connected who can help you, rather than attempting anything through official systems.

A coworker who was using the software gave me some feedback for a feature I could add.

And I said, give me another five months.
