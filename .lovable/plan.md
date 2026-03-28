

## Fix: "How We Build Value" Section Being Covered

The "Value Creation Playbook" section on line 89 has `-mt-10` which pulls it upward into the previous ScrollRevealText section, causing the heading to be partially hidden.

**File: `src/pages/OurPlaybook.tsx` (line 89)**
- Remove `-mt-10` negative margin
- Add proper top padding: `pt-14 md:pt-20 lg:pt-24` to give breathing room above the heading

Change:
```
className="bg-background px-5 md:px-10 lg:px-16 pb-14 md:pb-20 lg:pb-24 -mt-10 overflow-x-hidden"
```
To:
```
className="bg-background px-5 md:px-10 lg:px-16 pt-14 md:pt-20 lg:pt-24 pb-14 md:pb-20 lg:pb-24 overflow-x-hidden"
```

