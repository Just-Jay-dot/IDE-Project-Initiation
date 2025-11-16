# CURSOR.MD: Complete Cursor IDE Configuration & AI Rules Guide

## Overview

This document provides comprehensive configuration for using Cursor IDE as your AI-assisted development environment for product development. It establishes global AI behavior rules, project-specific guidelines, and best practices for maximizing productivity while maintaining code quality, security, and architectural consistency.

**Target:** Use alongside `.cursor/rules/` MDC files in your project root for seamless AI assistance across all development phases.

---

## Part 1: User Rules (Global Cursor Configuration)

User Rules apply globally across all Cursor projects. Configure these in Cursor Settings → Rules.

### 1.1 Core Development Principles

**Rule Name:** `development-standards`
**Type:** Always
**Priority:** High

```
You are an expert senior software engineer with expertise in full-stack web development, 
AI/LLM integration, system design, and DevOps. You follow these absolute principles:

## Code Quality Standards
- Write clean, maintainable code following SOLID principles
- Prefer explicit over implicit; clarity over cleverness
- Use meaningful variable names; avoid single-letter vars except loop counters
- DRY principle: Extract repeated logic into reusable functions
- KISS principle: Keep solutions simple; don't over-engineer
- Maximum function length: 50 lines; if longer, extract helpers
- Maximum file length: 500 lines; split into logical modules

## Type Safety & Validation
- Use TypeScript everywhere; no `any` types without justification
- Validate all user inputs and API responses
- Use explicit error types; never suppress errors silently
- Include input validation in all API endpoints
- Type all function parameters and return values
- Use discriminated unions for complex state management

## Testing Standards
- Write tests for all business logic
- Minimum coverage: 80% for critical paths, 60% for general code
- Unit tests: Fast, isolated, independent
- Integration tests: Verify component interactions
- Test error cases and edge cases, not just happy paths
- Use descriptive test names following pattern: "should [behavior] when [condition]"

## Security First
- Never log sensitive data (passwords, tokens, API keys)
- Sanitize all user inputs before database storage
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization checks
- Validate CORS, CSRF, and XSS protections
- Encrypt data in transit (HTTPS) and at rest
- Never commit secrets to repository; use environment variables

## Performance Considerations
- Optimize database queries; avoid N+1 problems
- Cache appropriately but invalidate properly
- Use pagination for large datasets
- Minimize re-renders in React components
- Monitor API response times; keep <500ms p95
- Use async/await; avoid blocking operations
- Implement proper logging and monitoring hooks

## Error Handling & Resilience
- Implement exponential backoff for retries
- Provide meaningful error messages to users
- Log stack traces for debugging
- Gracefully degrade functionality on failures
- Implement circuit breakers for external API calls
- Set appropriate timeouts on all async operations
- Use custom error classes for different error types

## Architecture & Modularization
- Separate concerns: Controllers, services, repositories
- Keep business logic out of route handlers
- Use dependency injection for testability
- Favor composition over inheritance
- Keep functions and files small and focused
- Use meaningful folder structures reflecting domain concepts
```

### 1.2 AI-Assisted Development Workflow

**Rule Name:** `ai-workflow-guidelines`
**Type:** Always
**Priority:** High

```
When assisting with development tasks, follow this workflow:

## Before Writing Code
1. Ask clarifying questions if requirements are ambiguous
2. Propose architectural approach for approval
3. Identify potential edge cases and error scenarios
4. Outline implementation plan with major milestones
5. Confirm dependencies and assumptions

## During Implementation
1. Provide inline comments for non-obvious logic
2. Include type definitions and error handling upfront
3. Write tests alongside or immediately after code
4. Suggest improvements and security considerations
5. Explain complex algorithmic decisions
6. Flag potential performance issues

## Code Review Mindset
1. Review code for security vulnerabilities
2. Check for proper error handling
3. Verify type safety and null checks
4. Identify opportunities for simplification
5. Suggest relevant design patterns
6. Point out potential performance bottlenecks

## Documentation Practices
1. Document public API interfaces
2. Explain "why" not just "what"
3. Include examples for non-obvious functions
4. Update README when structure changes
5. Keep inline comments updated with code changes
6. Document assumptions and constraints

## When Uncertain
1. Explain the uncertainty clearly
2. Provide multiple approaches with trade-offs
3. Suggest how to validate/test the approach
4. Ask for user preference/guidance
5. Never guess or make assumptions silently
```

### 1.3 Communication & Output Format

**Rule Name:** `output-format-standards`
**Type:** Always
**Priority:** Medium

```
When communicating with the user:

## Code Output
- Always include file path in code blocks: // src/services/auth.ts
- Use proper syntax highlighting language identifier
- Include imports and full context
- Add TODOs for areas needing manual adjustment
- Explain significant code decisions in comments

## Explanations
- Start with a high-level summary
- Break complex topics into digestible parts
- Use examples to illustrate concepts
- Include trade-offs when suggesting multiple approaches
- End with action items or next steps

## Questions & Clarifications
- Ask specific, focused questions
- Provide context for why the question matters
- Suggest a direction if appropriate
- Wait for user response before proceeding

## Error Messages & Warnings
- Be specific about what went wrong
- Provide actionable solutions
- Include relevant code snippets
- Suggest prevention strategies
- Never use vague terms like "something's wrong"

## Terminal/Bash Commands
- Explain what each command does
- Warn about potentially destructive operations
- Suggest safe alternatives when available
- Include comments in scripts
- Provide rollback procedures when relevant
```

### 1.4 Project Context Understanding

**Rule Name:** `project-context-awareness`
**Type:** Always
**Priority:** High

```
Before making coding decisions:

1. **Understand Project Phase**
   - MVP (minimal scope, speed priority)
   - Growth (scaling, optimization)
   - Maintenance (stability, tech debt)
   - Customize recommendations to phase

2. **Technology Stack Awareness**
   - Request and respect stated tech choices
   - Explain why tech choice matters for this use case
   - Suggest alternatives only with strong justification
   - Follow existing patterns in the codebase

3. **Team Context**
   - Respect team experience levels
   - Avoid over-engineering for small teams
   - Suggest solutions appropriate for team size
   - Recommend learning resources when relevant

4. **Performance Requirements**
   - Ask about scale expectations
   - Optimize for actual constraints, not theoretical perfection
   - Suggest monitoring/measurement approaches
   - Balance performance with maintainability

5. **Deployment & Infrastructure**
   - Understand deployment target (local, serverless, containers)
   - Consider infrastructure constraints
   - Suggest deployment-appropriate patterns
   - Include monitoring and logging from start
```

---

## Part 2: Project Rules (Store in `.cursor/rules/`)

Create MDC files in `.cursor/rules/` for project-specific AI behavior.

## 2.1 Project Guidelines Rule

**File:** `.cursor/rules/project-guidelines.mdc`

```markdown
---
Description: Core project guidelines and development philosophy
Category: Project Standards
---

# Project Development Guidelines

## Project Overview
- **Product:** [Product Name]
- **Status:** [MVP | Development | Beta | Production]
- **Tech Stack:** [List technologies]
- **Team Size:** [X engineers]
- **Launch Target:** [Target date]

## Code Organization

### Directory Structure Expectations
```
src/
├── api/                    # API routes and controllers
├── services/               # Business logic and external integrations
├── models/                 # Data models and database schemas
├── utils/                  # Utility functions and helpers
├── hooks/                  # React hooks (if applicable)
├── components/             # Reusable UI components
├── middleware/             # Express/HTTP middleware
└── __tests__/              # Test files co-located
```

### Naming Conventions
- Files: `camelCase.ts` or `kebab-case.ts` (team consensus)
- Classes: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- React Components: `PascalCase.tsx`
- React Hooks: `useCamelCase.ts`
- Database tables: `snake_case` (lowercase)
- Database columns: `snake_case`

### Module Organization
- Keep related functionality together
- One primary export per file (named exports for utilities)
- Group imports: React/external libs, then relative imports
- Use index.ts files to manage public APIs

## Coding Standards

### TypeScript Strictness
- `strict: true` in tsconfig.json (no exceptions)
- No `any` type usage without specific reason documented
- All function parameters typed
- All function return types explicit
- Discriminated unions for complex types
- Use `unknown` when type is truly unknown

### Error Handling
- Throw/catch typed errors: `class AppError extends Error`
- Never swallow errors silently
- Log errors with context (user ID, request ID, etc.)
- Include error codes for API responses
- Implement fallback UI for error states

### Async Operations
- Use async/await; avoid nested callbacks
- Implement timeouts (never infinite waits)
- Proper error handling in catch blocks
- Use AbortController for cancellable operations
- Implement retry logic with exponential backoff

### Database Queries
- Use parameterized queries (prepared statements)
- Implement connection pooling
- Add indexes for frequently queried fields
- Use transactions for related operations
- Implement caching layer for read-heavy operations

## Testing Requirements

### Unit Tests
- Test file location: `src/__tests__/[module].test.ts`
- Framework: [Jest | Vitest | other]
- Coverage target: 80% for critical code paths
- Test naming: `describe() > it("should [behavior]")`

### Integration Tests
- Test database interactions
- Test API endpoint flows
- Test service layer with mocked dependencies
- Location: `tests/integration/`

### E2E Tests
- Test critical user journeys
- Framework: [Playwright | Cypress | other]
- Location: `tests/e2e/`

## API Design Standards

### RESTful Endpoint Patterns
```
GET /api/v1/[resource]           # List with pagination
GET /api/v1/[resource]/:id       # Fetch single
POST /api/v1/[resource]          # Create
PATCH /api/v1/[resource]/:id     # Partial update
DELETE /api/v1/[resource]/:id    # Delete
```

### Response Format
```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "timestamp": "2025-01-20T10:00:00Z",
    "requestId": "uuid"
  }
}
```

### Request/Response Validation
- Validate all input with Zod or similar
- Document all parameters and response types
- Include error response examples
- Use 400/401/403/404/500 status codes appropriately

## Performance Targets

- API response time: <500ms p95
- Database query time: <100ms
- Page load time: <3 seconds
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- Uptime: 99.9% in production

## Security Checklist

- [ ] All inputs validated and sanitized
- [ ] Rate limiting implemented for public endpoints
- [ ] CORS properly configured
- [ ] CSRF protection enabled
- [ ] Secrets in environment variables, not code
- [ ] Dependency vulnerabilities checked (npm audit)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (context-aware encoding)
- [ ] Authentication/Authorization implemented
- [ ] HTTPS enforced in production
- [ ] Security headers configured (CSP, etc.)
- [ ] Regular security audits scheduled

## Logging & Monitoring

- Log level: DEBUG in development, INFO in production
- Include request ID in all logs
- Never log sensitive data
- Implement structured logging (JSON format)
- Set up error tracking (Sentry or similar)
- Monitor key business metrics
- Create alerts for critical errors

## Documentation Standards

- README: Setup, running locally, architecture overview
- API Documentation: OpenAPI/Swagger format
- Deployment Guide: Step-by-step production deployment
- Architecture Decision Records (ADR): Major technical decisions
- Inline Comments: For non-obvious logic only
```

## 2.2 API Standards Rule

**File:** `.cursor/rules/api-standards.mdc`

```markdown
---
Description: API design, validation, and implementation standards
Category: API Development
---

# API Standards & Best Practices

## Endpoint Implementation Template

```typescript
// Validation
const requestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Handler
router.post("/auth/login", async (req, res, next) => {
  try {
    // 1. Validate input
    const input = requestSchema.parse(req.body);
    
    // 2. Business logic
    const result = await authService.login(input);
    
    // 3. Prepare response
    const response = {
      success: true,
      data: result,
      meta: { timestamp: new Date().toISOString() },
    };
    
    // 4. Return
    res.json(response);
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

## Versioning Strategy
- Maintain `/v1/`, `/v2/` paths for major versions
- Deprecate old versions after 6-month notice period
- Use feature flags for gradual rollouts
- Document breaking changes in migration guides

## Rate Limiting
- Implement per-IP and per-user limits
- Return `429 Too Many Requests` with Retry-After header
- Provide generous free tier (1000 req/hour minimum)
- Configure stricter limits for expensive operations

## Error Responses
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "email": "Invalid email format"
    }
  }
}
```

## Status Codes
- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Validation error
- `401`: Unauthorized
- `403`: Forbidden (authenticated but no permission)
- `404`: Not found
- `429`: Too many requests
- `500`: Server error
```

## 2.3 Testing Strategy Rule

**File:** `.cursor/rules/testing-requirements.mdc`

```markdown
---
Description: Testing standards, coverage requirements, and test patterns
Category: Testing & QA
---

# Testing Strategy & Patterns

## Test Structure

```typescript
describe("AuthService.login", () => {
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
  });

  it("should return user token when credentials are valid", async () => {
    // Arrange
    const credentials = { email: "test@example.com", password: "password123" };
    mockUserRepository.findByEmail.mockResolvedValue(testUser);

    // Act
    const result = await authService.login(credentials);

    // Assert
    expect(result).toHaveProperty("token");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(credentials.email);
  });

  it("should throw error when user not found", async () => {
    // Arrange
    mockUserRepository.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(authService.login({ email: "test@example.com", password: "x" }))
      .rejects.toThrow("User not found");
  });
});
```

## Coverage Requirements
- Critical business logic: 90%+
- API handlers: 80%+
- Utilities: 70%+
- UI components: 50%+
- Skip: Third-party code, auto-generated files

## Integration Test Example

```typescript
describe("POST /api/v1/auth/login", () => {
  beforeAll(async () => {
    await initializeDatabase();
    await seedTestData();
  });

  it("should authenticate user with valid credentials", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "correct-password" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("token");
  });
});
```

## Test Naming Pattern
```
✓ should [expected behavior] when [condition]
✓ should throw [error] when [condition]
✓ should call [dependency] with [parameters] when [condition]
```

## Mock & Stub Patterns
- Mock external dependencies (APIs, databases)
- Stub slow operations (network calls)
- Spy on internal function calls
- Use factory functions for test data creation
- Reset mocks between tests
```

## 2.4 Security Checklist Rule

**File:** `.cursor/rules/security-checklist.mdc`

```markdown
---
Description: Security requirements, vulnerability prevention, and compliance standards
Category: Security
---

# Security Implementation Checklist

## Input Validation & Sanitization
- [ ] Validate all user inputs with schema validation (Zod, Joi)
- [ ] Sanitize HTML content to prevent XSS
- [ ] Reject oversized payloads (>10MB default)
- [ ] Validate file types and sizes for uploads
- [ ] Use allowlists instead of blocklists for validation

## Authentication & Authorization
- [ ] Implement proper session management
- [ ] Use secure password hashing (bcrypt with cost factor 12+)
- [ ] Implement rate limiting on login attempts
- [ ] Require HTTPS/TLS for all connections
- [ ] Use httpOnly, secure, sameSite cookies
- [ ] Implement JWT expiration and refresh token rotation
- [ ] Require 2FA for sensitive operations

## Data Protection
- [ ] Encrypt sensitive data at rest
- [ ] Encrypt data in transit (HTTPS/TLS 1.2+)
- [ ] Use parameterized queries (prevent SQL injection)
- [ ] Implement field-level access control
- [ ] Mask PII in logs
- [ ] Regular database backups with encryption

## API Security
- [ ] Implement rate limiting per IP and per user
- [ ] Validate content-type headers
- [ ] Implement CORS with specific allowed origins
- [ ] Use CSRF tokens for state-changing requests
- [ ] Implement API versioning for breaking changes
- [ ] Add request signing for critical operations

## Dependency Management
- [ ] Run `npm audit` regularly
- [ ] Update dependencies monthly (at minimum)
- [ ] Review dependency licenses (no GPL if proprietary)
- [ ] Use lockfile (package-lock.json)
- [ ] Scan with security tools (Snyk, WhiteSource)

## Secrets Management
- [ ] Use .env files (never commit to git)
- [ ] Use different secrets for dev/staging/production
- [ ] Rotate secrets regularly (at least quarterly)
- [ ] Use environment variables in production
- [ ] Use secret management service (AWS Secrets Manager, Vault)
- [ ] Audit secret access logs

## Infrastructure Security
- [ ] Enable HTTPS/TLS with valid certificates
- [ ] Configure security headers (CSP, X-Frame-Options, etc.)
- [ ] Implement firewall rules
- [ ] Regular vulnerability scanning
- [ ] Keep systems patched and updated
- [ ] Monitor and alert on suspicious activities

## Incident Response
- [ ] Have incident response plan documented
- [ ] Know who to contact for security issues
- [ ] Have rollback procedures ready
- [ ] Monitor logs for suspicious patterns
- [ ] Backup systems accessible for recovery
```

---

## Part 3: Best Practices for Cursor Usage

### 3.1 Effective Prompting Patterns

**Pattern 1: Architecture Question**
```
I'm building [feature description]. I'm thinking of [approach A], 
but [concern]. Should I consider [approach B]? 

Context:
- Tech stack: [tech]
- Scale: [expected users/requests]
- Constraints: [budget, time, team size]

What tradeoffs should I consider?
```

**Pattern 2: Code Review**
```
Review this code for [specific aspect: security | performance | maintainability]:

[paste code]

Things I'm concerned about: [your concerns]
Does this follow [project/team standards]? What would you change?
```

**Pattern 3: Feature Implementation**
```
I need to implement [feature]. Here's what I'm thinking:

1. [step 1]
2. [step 2]
3. [step 3]

Questions:
- Is this approach sound?
- What edge cases am I missing?
- Any security implications?

Let me know if you see issues before I start coding.
```

**Pattern 4: Debugging**
```
I'm getting [error message] when [what you're doing].

What I've tried:
1. [attempt 1] - result
2. [attempt 2] - result

Relevant code:
[paste code]

What should I check next?
```

### 3.2 Using @-References Effectively

**File Reference:**
```
@src/services/auth.ts   # Include entire file
```

**Folder Reference:**
```
@src/services/          # Include all files in services
```

**Multiple References:**
```
@src/api/auth.ts @src/services/auth.ts @src/models/user.ts
```

### 3.3 Context Building for Complex Tasks

**For Large Refactors:**
1. Reference current implementation: `@src/old-pattern/`
2. Reference desired pattern: Link to documentation or similar file
3. Provide migration checklist
4. Ask Cursor to plan approach before implementing

**For New Features:**
1. Reference related features: `@src/features/similar-feature/`
2. Reference data models: `@src/models/`
3. Reference existing test patterns: `@src/__tests__/`
4. Ask Cursor to explain the implementation plan first

**For Architecture Questions:**
1. Reference current architecture: `@docs/ARCHITECTURE.md`
2. Reference constraints: `@INSTRUCTIONS.md`
3. Reference tech decisions: `@docs/ADR/`
4. Ask for written proposal before implementation

---

## Part 4: Integration with Development Workflow

### 4.1 Development Session Template

**Start of Day:**
1. Open INSTRUCTIONS.md and current sprint goals
2. Reference `.cursor/rules/` for relevant task
3. Ask Cursor to summarize current codebase state
4. Plan day's work with Cursor's input

**During Development:**
1. Use `@` references for relevant files/patterns
2. Ask for code reviews before committing
3. Reference project guidelines for standards compliance
4. Use Cursor for test generation

**Before Commit:**
1. Ask Cursor to review changes for security/performance
2. Verify all tests passing (ask Cursor to write missing tests)
3. Update relevant documentation
4. Verify no secrets committed

### 4.2 Version Control Integration

**Cursor + Git Workflow:**

```bash
# 1. Cursor helps plan feature
# Create branch
git checkout -b feature/user-auth

# 2. Cursor assists with implementation
# Regular commits
git commit -m "feat: add JWT token generation"

# 3. Before PR
# Ask Cursor to review all changes
# Fix any issues

# 4. Create PR with Cursor's help generating description
git push origin feature/user-auth
```

---

## Part 5: Documentation Standards

### 5.1 Markdown Document Template

All `.md` files in `/docs` should follow this structure:

```markdown
---
title: Document Title
created_at: 2025-01-15 09:30:00 UTC
updated_at: 2025-01-20 14:30:00 UTC
updated_by: @username
status: [Draft | Review | Approved | Deprecated]
version: X.Y
---

# [Title - Matching filename]

## Quick Reference

[2-3 sentence summary of key content]

## Table of Contents
[Auto-generated or manual list of main sections]

## Main Content

### Section 1
[Content...]

### Section 2
[Content...]

## See Also

- [Related doc 1](./path/to/doc1.md)
- [Related doc 2](./path/to/doc2.md)

## Change Log

### v1.2 (2025-01-20 14:30:00 UTC)
- [Change description]

### v1.1 (2025-01-18 10:00:00 UTC)
- [Change description]

### v1.0 (2025-01-15 09:30:00 UTC)
- Initial version
```

---

## Part 6: Maintenance & Updates

### 6.1 Weekly Review

Every Friday, review and update:

- [ ] `CURSOR.MD` - Add any new learnings
- [ ] `.cursor/rules/` files - Update based on recent issues
- [ ] INSTRUCTIONS.md - Update current status and next priorities
- [ ] Team changelog - Document any pattern shifts

### 6.2 Monthly Audit

First day of month:

- [ ] Review all rules for relevance
- [ ] Check for deprecated patterns
- [ ] Update based on new team learnings
- [ ] Review security checklist
- [ ] Update estimated sprint velocity

---

## Summary

Effective Cursor usage requires:

1. **Clear Rules:** Document expectations in `.cursor/rules/`
2. **Project Context:** Maintain INSTRUCTIONS.md and ARCHITECTURE.md
3. **Smart Prompting:** Use patterns that get better results
4. **Regular Review:** Update rules based on team learnings
5. **Documentation:** Keep everything versioned and timestamped

This system ensures Cursor works as a true AI development partner rather than just an autocomplete tool, significantly improving development velocity while maintaining quality and security standards.
