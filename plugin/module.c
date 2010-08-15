#include <stdio.h>

#include "debug.h"
#include "npapi.h"
#include "identifier.h"
#include "init_modules.h"
#include "shell.h"

module *modules = NULL;

static bool
invokeDefault(NPObject *obj, const NPVariant *args, const uint32_t argCount, NPVariant *result)
{
   DEBUG_STR("module->invokeDefault(): false");
   return false;
}

static bool
hasMethod(NPObject *obj, NPIdentifier identifier)
{
   DEBUG_STR("module->hasMethod(%s): false", DEBUG_IDENTIFIER(identifier));
   return false;
}

static bool
invokeMethod(NPObject *obj, NPIdentifier identifier, const NPVariant *args, uint32_t argc, NPVariant *result)
{
   DEBUG_STR("module->invokeMethod(%s): false", DEBUG_IDENTIFIER(identifier));
   return false;
}

static bool
hasProperty(NPObject *obj, NPIdentifier identifier)
{
   DEBUG_STR("module->hasProperty(%s): false", DEBUG_IDENTIFIER(identifier));
   return false;
}

static bool
getProperty(NPObject *obj, NPIdentifier identifier, NPVariant *result)
{
   DEBUG_STR("module->getProperty(%s): MODULE NOT AN OBJECT", DEBUG_IDENTIFIER(identifier));
   return false;
}

static void
destroy()
{
   DEBUG_STR("modules->destroy()");

#ifdef MODULE_PING
   if (ping)
      ping->destroy();
#endif

   if (modules)
      browser->memfree(modules);

   if (shell)
      shell->destroy();

}

bool
init_modules()
{
   DEBUG_STR("modules->init()");

   if (!init_shell())
      return false;

   modules = browser->memalloc(sizeof(*modules));
   if (!modules)
      return false;
   modules->destroy = destroy;

#ifdef MODULE_PING
   if (!init_module_ping())
      return false;
#endif

   return true;
}

NPClass moduleClass = {
   NP_CLASS_STRUCT_VERSION,
   NULL/*allocate*/,
   NULL/*deallocate*/,
   NULL/*invalidate*/,
   hasMethod,
   invokeMethod,
   invokeDefault,
   hasProperty,
   getProperty,
   NULL/*setProperty*/,
   NULL/*removeProperty*/,
   NULL/*enumerate*/,
   NULL/*construct*/
};
