#pragma once
#ifndef _IDENTIFIER_H_
#define _IDENTIFIER_H_

#include "npapi.h"
#include "init_modules.h"

typedef struct _identifier {
   NPIdentifier   read;
   NPIdentifier   start;
   NPIdentifier   stop;

   NPIdentifier   running;
   NPIdentifier   version;

#ifdef MODULE_PING
   NPIdentifier   ping;
#endif

   void           (*destroy)();
} identifier;

bool init_identifiers();

extern identifier *identifiers;

#endif /*_IDENTIFIER_H_*/
