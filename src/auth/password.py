"""Password hashing and verification utilities using bcrypt directly."""

import bcrypt
from src.core.config import settings


def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt with salt.

    Each password gets a unique salt automatically generated by bcrypt.

    Args:
        password: Plain text password to hash

    Returns:
        Hashed password string containing salt and hash
    """
    # Generate salt and hash password
    salt = bcrypt.gensalt(rounds=settings.BCRYPT_ROUNDS)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password against its hash.

    Args:
        plain_password: Plain text password to verify
        hashed_password: Stored hashed password to check against

    Returns:
        True if password matches, False otherwise
    """
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        # Handle invalid hash format or other verification errors
        return False


def validate_password_strength(password: str) -> tuple[bool, list[str]]:
    """
    Validate password meets complexity requirements.

    Requirements:
    - Minimum 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one digit
    - At least one special character

    Args:
        password: Password to validate

    Returns:
        Tuple of (is_valid, list_of_errors)
    """
    errors = []

    if len(password) < 8:
        errors.append("Password must be at least 8 characters long")

    if not any(c.isupper() for c in password):
        errors.append("Password must contain at least one uppercase letter")

    if not any(c.islower() for c in password):
        errors.append("Password must contain at least one lowercase letter")

    if not any(c.isdigit() for c in password):
        errors.append("Password must contain at least one number")

    # Check for special characters
    special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if not any(c in special_chars for c in password):
        errors.append("Password must contain at least one special character")

    return len(errors) == 0, errors


def needs_rehash(hashed_password: str) -> bool:
    """
    Check if a password hash needs to be rehashed.

    This checks if the hash was created with different bcrypt rounds
    than the current configuration.

    Args:
        hashed_password: The stored password hash

    Returns:
        True if the password should be rehashed, False otherwise
    """
    try:
        # Extract the cost (rounds) from the hash
        # bcrypt hash format: $2b$rounds$salt+hash
        if not hashed_password.startswith('$2b$'):
            return True  # Not a bcrypt hash, needs rehashing

        parts = hashed_password.split('$')
        if len(parts) < 4:
            return True  # Invalid format

        hash_rounds = int(parts[2])
        return hash_rounds != settings.BCRYPT_ROUNDS
    except Exception:
        # If we can't parse the hash, it definitely needs updating
        return True
